import { compile } from '@formatjs/cli-lib';
import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'vite';
import getI18nMessageFormat from '../utils/get-i18n-message-format';

function vitePluginI18nMessageCompilation(): Plugin {
  const filter = createFilter('**/i18n/data/*.json');
  return {
    name: 'vite-plugin-i18n-message-compilation',
    enforce: 'pre',
    async transform(code, id) {
      if (process.env.ENABLE_I18N_MESSAGE_COMPILATION && filter(id)) {
        const format = getI18nMessageFormat(code);
        const res = await compile([id], { ast: true, format });
        return { code: res, map: null };
      }
      return null;
    },
  };
}

export default vitePluginI18nMessageCompilation;
