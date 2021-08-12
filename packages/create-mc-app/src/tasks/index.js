const downloadTemplate = require('./download-template');
const installDependencies = require('./install-dependencies');
const updatePackageJson = require('./update-package-json');
const updateCustomApplicationConfig = require('./update-custom-application-config');
const updateApplicationConstants = require('./update-application-constants');

module.exports = {
  downloadTemplate,
  installDependencies,
  updatePackageJson,
  updateCustomApplicationConfig,
  updateApplicationConstants,
};
