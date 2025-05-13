/**
 * COPIED FROM https://github.com/pd4d10/vite-plugin-svgr
 */
import crypto from 'crypto';
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
import type { XastElement, PluginInfo } from 'svgo';
import { transformWithEsbuild, type Plugin } from 'vite';

function vitePluginSvgr(): Plugin {
  const filter = createFilter('**/*.react.svg');
  return {
    name: 'vite-plugin-svgr',
    async transform(_code, id) {
      if (filter(id)) {
        console.log(`Transforming ${id}...`);
        const { transform } = await import('@svgr/core');
        const svgCode = await fs.promises.readFile(id, 'utf8');

        const optimizeEmbeddedPngs = async (code: string) => {
          const pngRegex =
            /xlink:href="data:image\/png;base64,([a-zA-Z0-9+/]+=*)"/gs;
          let modifiedCode = code; // Create a mutable copy of the code

          const matchesIterator = code.matchAll(pngRegex);

          for (const match of matchesIterator) {
            const originalBase64 = match[1]; // Access the captured Base64 string (group 1)

            if (originalBase64) {
              try {
                console.log(
                  'originalPngString length: ',
                  originalBase64.length
                );

                const pngBuffer = Buffer.from(originalBase64, 'base64');
                const sharp = (await import('sharp')).default;

                const optimizedBuffer = await sharp(pngBuffer)
                  .png({
                    quality: 80,
                    compressionLevel: 9,
                  })
                  .toBuffer();
                const optimizedPngBase64 = optimizedBuffer.toString('base64');
                console.log(
                  'optimizedPngString length: ',
                  optimizedPngBase64.length
                );

                // Construct the new xlink:href value
                const originalMatch = match[0];
                const optimizedXlinkHref = originalMatch.replace(
                  originalBase64,
                  optimizedPngBase64
                );

                // Replace the original xlink:href with the optimized one
                modifiedCode = modifiedCode.replace(
                  originalMatch,
                  optimizedXlinkHref
                );
              } catch (error) {
                console.error(
                  'Error processing embedded PNG:',
                  error,
                  'Original Base64:',
                  originalBase64
                );
              }
            }
            console.log('------');
            console.log('code length: ', code.length);
            console.log('modifiedCode length: ', modifiedCode.length);
            console.log('------');
          }
          return modifiedCode; // Return the modified code
        };

        const optimizedSVGCode = await optimizeEmbeddedPngs(svgCode);
        // console.log('optimizedSVGCode: ', optimizedSVGCode);
        console.log('optimizedSVGCode length: ', optimizedSVGCode.length);
        const componentCode = await transform(
          optimizedSVGCode,
          {
            icon: false,
            svgoConfig: {
              plugins: [
                // inline plugin to compress embedded pngs
                {
                  name: 'sharp-png-compression',
                  type: 'perItem',
                  fn: async (ast, _, info) => {
                    if (ast.name === 'image') {
                      if (ast.attributes.hasOwnProperty('xlink:href')) {
                        const valueString = String(
                          ast.attributes['xlink:href']
                        );
                        // potentially large string embedded in the SVG
                        const originalPngString = valueString.split(',')[1];
                        // delete the original embedded image
                        delete ast.attributes['xlink:href'];
                        const pngBuffer = Buffer.from(
                          originalPngString,
                          'base64'
                        );
                        // https://www.npmjs.com/package/sharp
                        const sharp = (await import('sharp')).default;

                        const optimizedBuffer = await sharp(pngBuffer)
                          .png({
                            quality: 80, // Adjust quality (0-100)
                            compressionLevel: 9, // Adjust compression (0-9, 9 is best)
                          })
                          .toBuffer();

                        const optimizedPngString =
                          optimizedBuffer.toString('base64');

                        ast.attributes['xlink:href'] =
                          'data:image/png;base64,' + optimizedPngString;
                      }
                      // TODO: understand why the build includes the original png
                    }
                    return ast;
                  },
                },
                {
                  // https://github.com/svg/svgo#default-preset
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                // Avoid collisions with ids in other SVGs,
                // which was causing incorrect masking, gradient directions, etc
                // this is an ongoing issue with both SVGR and SVGO,
                // https://github.com/svg/svgo/issues/913#issuecomment-369373572
                // see SVGR issues:
                // https://github.com/gregberge/svgr/issues/322
                // https://github.com/gregberge/svgr/issues/210
                // see SVGO issues:
                // https://github.com/svg/svgo/issues/674
                // https://github.com/svg/svgo/issues/1746
                //
                // Initially, a naive counter was implemented based on this github comment:
                // https://github.com/svg/svgo/issues/1746#issuecomment-1803600573
                // But while that implementation insured id’s that are unique,
                // it did not work in cases where the id is both declared and referenced in the same file,
                // because the refernce gets a separate unique ID (a different number from the counter).
                //
                // The current implementation is based on this github comment:
                // https://github.com/svg/svgo/issues/913#issuecomment-369373572
                // Generates a hash of the filepath of the svg file, resulting in a prefix which is:
                // - Short,
                // - With characters valid for IDs,
                // - The same within a file,
                // - And different in different files.
                {
                  name: 'prefixIds',
                  params: {
                    delim: '',
                    prefix: (_: XastElement, info: PluginInfo) =>
                      `svg${crypto
                        .createHash('shake256', { outputLength: 6 })
                        .update(info.path || '')
                        .digest('hex')}`,
                  },
                },
              ],
            },
          },
          {
            filePath: id,
            caller: {
              previousExport: null,
            },
          }
        );
        console.log('componentCode length: ', componentCode.length);

        const res = await transformWithEsbuild(componentCode, id, {
          loader: 'jsx',
        });

        return {
          code: res.code,
          map: null, // TODO:
        };
      }
      return null;
    },
  };
}

export default vitePluginSvgr;
