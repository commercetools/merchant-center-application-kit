const os = require('os');
const fs = require('fs');
const path = require('path');
const { slugify } = require('../utils');

module.exports = function changePackageName(options) {
  return {
    title: 'Updating package.json',
    task: () => {
      const packageJsonPath = path.join(
        options.projectDirectoryPath,
        'package.json'
      );

      // Change the package name based on the given project directory name
      const appPackageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, { encoding: 'utf8' })
      );
      const updatedAppPackageJson = Object.assign({}, appPackageJson, {
        version: '1.0.0',
        // Given the package name is derived from the `projectDirectoryName`
        // the latter needs to be sanitised to have a ensure a valid package name.
        // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
        // as a result the package name potentially needs to be altered when derived.
        name: slugify(options.projectDirectoryName),
        description: '',
      });
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
        { encoding: 'utf8' }
      );
    },
  };
};
