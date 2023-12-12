/**
 * COPIED FROM https://github.com/pd4d10/vite-plugin-svgr
 */
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
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
                // which was causing incorrect gradient directions
                // https://github.com/svg/svgo/issues/1746#issuecomment-1803600573
                //
                // Previously, this was a problem where unique ids
                // could not be generated since svgo@3
                // https://github.com/svg/svgo/issues/674
                // https://github.com/svg/svgo/issues/1746
                {
                  name: 'prefixIds',
                  params: {
                    delim: '',
                    prefix: () => svgoPrefixIdsCount++ as unknown as string,
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
