const createWebpackConfigForDevelopment = require('./config/create-webpack-config-for-development');
const createWebpackConfigForProduction = require('./config/create-webpack-config-for-production');
const vendorsToCompile = require('./config/vendors-to-transpile');
const createPostcssConfig = require('./config/create-postcss-config');

module.exports = {
  createWebpackConfigForDevelopment,
  createWebpackConfigForProduction,
  vendorsToCompile,
  createPostcssConfig,
};
