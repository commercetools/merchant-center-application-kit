import { compile } from '@formatjs/cli-lib';
import type { LoaderDefinitionFunction } from 'webpack';

const messageLoader: LoaderDefinitionFunction = function (source) {
  const callback = this.async();

  const messageContents = JSON.parse(source);
  const firstValue = Object.values(messageContents)[0];
  const format = typeof firstValue === 'string' ? 'simple' : 'transifex';

  compile([this.resourcePath], { ast: true, format }).then((result) => {
    callback(null, result);
  });
};

export default messageLoader;
