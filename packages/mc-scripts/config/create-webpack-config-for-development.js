// For backwards compatibilty
console.log(
  'The import "@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development" is deprecated. Use the entry point "@commercetools-frontend/mc-scripts/webpack" instead.'
);
const {
  createWebpackConfigForDevelopment,
} = require('@commercetools-frontend/mc-scripts/webpack');
module.exports = createWebpackConfigForDevelopment;
