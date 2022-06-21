// These exports are deprecated.

import type { Configuration } from 'webpack';
import type { Config } from 'postcss-load-config';
import type { TWebpackConfigOptions, TPostcssConfigOptions } from './types';

function createWebpackConfigForDevelopment(
  options?: TWebpackConfigOptions<'development'>
): Configuration {
  console.log(
    'Importing the function "createWebpackConfigForDevelopment" from the main entry point "@commercetools-frontend/mc-scripts" is deprecated. Use the entry point "@commercetools-frontend/mc-scripts/create-webpack-config" instead.'
  );
  return require('@commercetools-frontend/mc-scripts/webpack').createWebpackConfigForDevelopment(
    options
  );
}

function createWebpackConfigForProduction(
  options?: TWebpackConfigOptions<'production'>
): Configuration {
  console.log(
    'Importing the function "createWebpackConfigForProduction" from the main entry point "@commercetools-frontend/mc-scripts" is deprecated. Use the entry point "@commercetools-frontend/mc-scripts/create-webpack-config" instead.'
  );
  return require('@commercetools-frontend/mc-scripts/webpack').createWebpackConfigForProduction(
    options
  );
}

function createPostcssConfig(options?: TPostcssConfigOptions): Config {
  console.log(
    'Importing the function "createPostcssConfig" from the main entry point "@commercetools-frontend/mc-scripts" is deprecated. Use the entry point "@commercetools-frontend/mc-scripts/create-postcss-config" instead.'
  );
  return require('@commercetools-frontend/mc-scripts/postcss').createPostcssConfig(
    options
  );
}

export {
  createWebpackConfigForDevelopment,
  createWebpackConfigForProduction,
  createPostcssConfig,
};
