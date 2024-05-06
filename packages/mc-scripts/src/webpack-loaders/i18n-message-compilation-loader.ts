import { compile } from '@formatjs/cli-lib';
import type { LoaderDefinitionFunction } from 'webpack';
import getI18nMessageFormat from '../utils/get-i18n-message-format';

const i18nMessageCompilationLoader: LoaderDefinitionFunction = function (
  source
) {
  const callback = this.async();
  const format = getI18nMessageFormat(source);
  compile([this.resourcePath], { ast: true, format }).then((result) => {
    callback(null, result);
  });
};

export default i18nMessageCompilationLoader;
