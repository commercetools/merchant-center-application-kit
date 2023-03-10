import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Compiler } from 'webpack';
import { processConfig } from '@commercetools-frontend/application-config';
import { replaceHtmlPlaceholders } from '@commercetools-frontend/mc-html-template';

class LocalHtmlWebpackPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('LocalHtmlWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'LocalHtmlWebpackPlugin',
        (data, cb) => {
          const applicationConfig = processConfig();
          const enhancedLocalEnv = Object.assign(
            {},
            applicationConfig.env,
            // Now that the app config is defined as a `env.json`, when we start the FE app
            // to point to the local backend API by passing the `MC_API_URL` env does not
            // work anymore). To make it work again, we can override the `env.json` config
            // with the env variable before injecting the values into the index.html.
            // NOTE: this is only necessary for development.
            process.env.MC_API_URL
              ? {
                  mcApiUrl: process.env.MC_API_URL,
                }
              : {}
          );

          data.html = replaceHtmlPlaceholders(data.html, {
            env: enhancedLocalEnv,
            headers: {},
          });
          cb(null, data);
        }
      );
    });
  }
}

export default LocalHtmlWebpackPlugin;
