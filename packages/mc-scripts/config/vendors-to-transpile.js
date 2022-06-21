// For backwards compatibilty
console.log(
  'The import "@commercetools-frontend/mc-scripts/config/vendors-to-transpile" is deprecated. Use the main entry point "@commercetools-frontend/mc-scripts" instead.'
);
const { vendorsToTranspile } = require('../');
module.exports = vendorsToTranspile;
