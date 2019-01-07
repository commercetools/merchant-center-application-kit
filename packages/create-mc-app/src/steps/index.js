const downloadTemplate = require('./download-template');
const installDependencies = require('./install-dependencies');
const parseArguments = require('./parse-arguments');
const success = require('./success');
const updatePackageInfo = require('./update-package-info');

module.exports = {
  downloadTemplate,
  installDependencies,
  parseArguments,
  success,
  updatePackageInfo,
};
