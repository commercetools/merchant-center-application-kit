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
        const { transform } = await import('@svgr/core');
        const svgCode = await fs.promises.readFile(id, 'utf8');

        const optimizeEmbeddedPngs = async (code: string) => {
          const pngRegex = /href="data:image\/png;base64,([a-zA-Z0-9+/]+=*)"/gs;
          let modifiedCode = code;
          const matchesIterator = code.matchAll(pngRegex);

          for (const match of matchesIterator) {
            const originalBase64 = match[1];

            if (originalBase64) {
              // This length would indicate that the match is greater than ~1mb
              if (originalBase64.length > 1000000) {
                const fileName = id.split('/').pop();
                console.warn(
                  `\n🚨 You have a large png embedded in ${fileName} - consider using an image tag instead 🚨`
                );
                try {
                  const pngBuffer = Buffer.from(originalBase64, 'base64');
                  const sharp = (await import('sharp')).default;
                  const optimizedBuffer = await sharp(pngBuffer)
                    .png({
                      quality: 10,
                      compressionLevel: 9,
                    })
                    .toBuffer();
                  const optimizedPngBase64 = optimizedBuffer.toString('base64');
                  // Construct the new href value
                  const originalMatch = match[0];
                  const optimizedXlinkHref = originalMatch.replace(
                    originalBase64,
                    optimizedPngBase64
                  );
                  // Replace the original href with the optimized one
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
            }
          }
          return modifiedCode;
        };

        const optimizedSVGCode = await optimizeEmbeddedPngs(svgCode);
        const componentCode = await transform(
          optimizedSVGCode,
          {
            icon: false,
            svgoConfig: {
              plugins: [
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
