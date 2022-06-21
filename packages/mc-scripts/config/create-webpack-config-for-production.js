// For backwards compatibilty
console.log(
  'The import "@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production" is deprecated. Use the entry point "@commercetools-frontend/mc-scripts/webpack" instead.'
);
const {
  createWebpackConfigForProduction,
} = require('@commercetools-frontend/mc-scripts/webpack');
module.exports = createWebpackConfigForProduction;
