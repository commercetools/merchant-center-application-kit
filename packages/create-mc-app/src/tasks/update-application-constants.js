const os = require('os');
const fs = require('fs');
const path = require('path');
const rcfile = require('rcfile');
const prettier = require('prettier');
const babel = require('@babel/core');
const { resolveFilePathByExtension } = require('../utils');

function replaceEntryPointUriPathInConstants(filePath, options) {
  const result = babel.transformFileSync(filePath, {
    plugins: [
      function replaceConstants() {
        return {
          visitor: {
            VariableDeclarator(nodePath) {
              if (nodePath.node.id.name === 'entryPointUriPath') {
                nodePath.node.init = babel.types.stringLiteral(
                  options.entryPointUriPath
                );
              }
            },
          },
        };
      },
    ],
    retainLines: true,
  });

  const prettierConfig = rcfile('prettier', {
    cwd: options.projectDirectoryPath,
  });
  const formattedData = prettier.format(result.code + os.EOL, prettierConfig);
  fs.writeFileSync(filePath, formattedData, {
    encoding: 'utf8',
  });
}

module.exports = function updateApplicationConstants(options) {
  return {
    title: 'Updating application constants',
    task: () => {
      const applicationConstantsPath = resolveFilePathByExtension(
        path.join(options.projectDirectoryPath, 'src/constants')
      );
      replaceEntryPointUriPathInConstants(applicationConstantsPath, options);
    },
  };
};
