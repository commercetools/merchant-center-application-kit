/* eslint-disable prefer-object-spread/prefer-object-spread */

const os = require('os');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const { slugify } = require('../utils');

module.exports = function changePackageName({
  projectDirectoryName,
  projectDirectoryPath,
}) {
  logger.info(`📝 Updating package.json...`);

  // Change the package name based on the given project directory name
  const appPackageJson = JSON.parse(
    fs.readFileSync(path.join(projectDirectoryPath, 'package.json'), {
      encoding: 'utf8',
    })
  );
  const updatedAppPackageJson = Object.assign({}, appPackageJson, {
    version: '1.0.0',
    // Given the package name is derived from the `projectDirectoryName`
    // the latter needs to be sanitised to have a ensure a valid package name.
    // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
    // as a result the package name potentially needs to be altered when derived.
    name: slugify(projectDirectoryName),
    description: '',
  });
  fs.writeFileSync(
    path.join(projectDirectoryPath, 'package.json'),
    JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
    { encoding: 'utf8' }
  );
};
