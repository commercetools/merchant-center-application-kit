/**
 * COPIED FROM https://github.com/pd4d10/vite-plugin-svgr
 */
import fs from 'fs';
import type { Config } from '@svgr/core';
import { transformWithEsbuild, type Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';

type VitePluginSvgrOptions = {
  svgrOptions?: Config;
};

function vitePluginSvgr({ svgrOptions }: VitePluginSvgrOptions = {}): Plugin {
  const filter = createFilter('**/*.react.svg');
  return {
    name: 'vite-plugin-svgr',
    async transform(_code, id) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core');
        const svgCode = await fs.promises.readFile(id, 'utf8');

        const componentCode = await transform(svgCode, svgrOptions, {
          filePath: id,
          caller: {
            previousExport: null,
          },
        });

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
