import { compile } from '@formatjs/cli-lib';
import type { LoaderDefinitionFunction } from 'webpack';

const messageLoader: LoaderDefinitionFunction = function () {
  const callback = this.async();

  compile([this.resourcePath], { ast: true, format: 'simple' }).then(
    (result) => {
      callback(null, result);
    }
  );
};

export default messageLoader;
