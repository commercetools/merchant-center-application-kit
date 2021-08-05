const os = require('os');
const fs = require('fs');
const path = require('path');
const { slugify } = require('../utils');

const entryPointVariableRegex = /entryPointUriPath\s?=\s?'(.*)';$/;

// TODO: when we enable OIDC login as the default behavior, we also want to
// update the following things:
// * permission names (based on the entryPointUriPath)
module.exports = function updateApplicationConstants(options) {
  return {
    title: 'Updating application constants',
    task: () => {
      const applicationConstantsPath = path.join(
        options.projectDirectoryPath,
        // TODO: support other file extensions?
        'src/constants/application.js'
      );
      const appConstantsRaw = fs.readFileSync(applicationConstantsPath, {
        encoding: 'utf8',
      });

      // Set the entry point based on the package/folder name.
      const entryPointUriPath = slugify(options.projectDirectoryName);

      // TODO: use Babel AST?
      appConstantsRaw.replace(
        entryPointVariableRegex,
        `entryPointUriPath = '${entryPointUriPath}';`
      );

      fs.writeFileSync(applicationConstantsPath, appConstantsRaw + os.EOL, {
        encoding: 'utf8',
      });
    },
  };
};
