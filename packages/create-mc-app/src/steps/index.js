const downloadTemplate = require('./download-template');
const hintOutdatedVersion = require('./hint-outdated-version');
const installDependencies = require('./install-dependencies');
const parseArguments = require('./parse-arguments');
const success = require('./success');
const updatePackageInfo = require('./update-package-info');

module.exports = {
  downloadTemplate,
  hintOutdatedVersion,
  installDependencies,
  parseArguments,
  success,
  updatePackageInfo,
};
