const os = require('os');
const fs = require('fs');
const path = require('path');
const { slugify, wordify } = require('../utils');

module.exports = function updateCustomApplicationConfig(options) {
  // NOTE: this only works assuming the template uses a JSON file.
  return {
    title: 'Updating custom-application-config.json',
    task: () => {
      const customApplicationConfigJsonPath = path.join(
        options.projectDirectoryPath,
        'custom-application-config.json'
      );
      const appConfigJson = JSON.parse(
        fs.readFileSync(customApplicationConfigJsonPath, { encoding: 'utf8' })
      );

      // Set the entry point based on the package/folder name.
      const entryPointUriPath = slugify(options.projectDirectoryName);
      const appName = wordify(entryPointUriPath);

      const updatedAppConfigJson = Object.assign({}, appConfigJson, {
        name: appName,
        entryPointUriPath,
        menuLinks: {
          ...appConfigJson.menuLinks,
          defaultLabel: appName,
        },
      });

      fs.writeFileSync(
        customApplicationConfigJsonPath,
        JSON.stringify(updatedAppConfigJson, null, 2) + os.EOL,
        { encoding: 'utf8' }
      );
    },
  };
};
