const loadCustomEnv = require('./load-custom-env');

const fileNameDev = 'env.json';
const fileNameProd = 'env.prod.json';

// Default configuration containing optional fields
const defaultConfig = {
  tracking: {},
  servedByProxy: false,
};

// eslint-disable-next-line prefer-object-spread/prefer-object-spread
const mergedConfig = Object.assign(
  {},
  defaultConfig,
  loadCustomEnv(
    process.env.NODE_ENV === 'production' ? fileNameProd : fileNameDev
  )
);

module.exports = mergedConfig;
