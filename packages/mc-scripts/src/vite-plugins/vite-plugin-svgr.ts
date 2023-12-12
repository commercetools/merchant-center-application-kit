/**
 * COPIED FROM https://github.com/pd4d10/vite-plugin-svgr
 */
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
import stringHash from 'string-hash';
import type { XastElement, PluginInfo } from 'svgo';
import { transformWithEsbuild, type Plugin } from 'vite';

let svgoPrefixIdsCount = 0;

function vitePluginSvgr(): Plugin {
  const filter = createFilter('**/*.react.svg');
  return {
    name: 'vite-plugin-svgr',
    async transform(_code, id) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core');
        const svgCode = await fs.promises.readFile(id, 'utf8');

        const componentCode = await transform(
          svgCode,
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
                      `svg${stringHash(info.path || '')}`,
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
