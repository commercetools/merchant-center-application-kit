const fs = require('fs');
const path = require('path');
const rcfile = require('rcfile');
const prettier = require('prettier');
const babel = require('@babel/core');
const { wordify, resolveFilePathByExtension } = require('../utils');

function replaceApplicationInfoInCustomApplicationConfig(filePath, options) {
  const appName = wordify(options.entryPointUriPath);

  const result = babel.transformFileSync(filePath, {
    plugins: [
      function replaceCustomApplicationConfig() {
        return {
          visitor: {
            Identifier(nodePath) {
              if (nodePath.isIdentifier({ name: 'name' })) {
                nodePath.parent.value = babel.types.stringLiteral(appName);
              }
              if (nodePath.isIdentifier({ name: 'initialProjectKey' })) {
                nodePath.parent.value = babel.types.stringLiteral(
                  options.initialProjectKey
                );
              }
              if (nodePath.isIdentifier({ name: 'defaultLabel' })) {
                if (
                  nodePath.findParent((parentPath) =>
                    parentPath.get('key').isIdentifier({ name: 'mainMenuLink' })
                  )
                ) {
                  nodePath.parent.value = babel.types.stringLiteral(appName);
                }
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
  const formattedData = prettier.format(result.code, prettierConfig);
  fs.writeFileSync(filePath, formattedData, {
    encoding: 'utf8',
  });
}

module.exports = function updateCustomApplicationConfig(options) {
  return {
    title: 'Updating Custom Applications config',
    task: () => {
      const customApplicationConfigPath = resolveFilePathByExtension(
        path.join(options.projectDirectoryPath, 'custom-application-config')
      );
      replaceApplicationInfoInCustomApplicationConfig(
        customApplicationConfigPath,
        options
      );
    },
  };
};
