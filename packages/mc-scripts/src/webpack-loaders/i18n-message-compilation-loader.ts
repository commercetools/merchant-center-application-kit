import { compile } from '@formatjs/cli-lib';
import type { LoaderDefinitionFunction } from 'webpack';
import {
  getI18nMessageFormat,
  handleMessageCompilationError,
} from '../utils/i18n-message-complilation';

const i18nMessageCompilationLoader: LoaderDefinitionFunction = function (
  source
) {
  const callback = this.async();

  let format;
  try {
    format = getI18nMessageFormat(source);
  } catch (error) {
    handleMessageCompilationError(this.resourcePath, error, this.emitWarning);
    callback(null, source);
  }

  compile([this.resourcePath], { ast: true, format })
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      handleMessageCompilationError(this.resourcePath, error, this.emitWarning);
      callback(null, source);
    });
};

export default i18nMessageCompilationLoader;
