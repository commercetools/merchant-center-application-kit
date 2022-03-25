const fs = require('fs');
const rcfile = require('rcfile');
const prettier = require('prettier');
const babel = require('@babel/core');
const {
  getCustomApplicationConfigPath,
} = require('@commercetools-frontend/application-config');

function updateApplicationIdInCustomApplicationConfig(applicationId) {
  const filePath = getCustomApplicationConfigPath();
  const result = babel.transformFileSync(filePath, {
    plugins: [
      function replaceCustomApplicationConfig() {
        return {
          visitor: {
            Identifier(nodePath) {
              if (nodePath.isIdentifier({ name: 'applicationId' })) {
                if (
                  nodePath.findParent((parentPath) =>
                    parentPath.get('key').isIdentifier({ name: 'env' })
                  )
                ) {
                  nodePath.parent.value =
                    babel.types.stringLiteral(applicationId);
                }
              }
            },
          },
        };
      },
    ],
    retainLines: true,
  });

  const prettierConfig = rcfile('prettier');
  const formattedData = prettier.format(result.code, prettierConfig);
  fs.writeFileSync(filePath, formattedData, {
    encoding: 'utf8',
  });
}

module.exports = updateApplicationIdInCustomApplicationConfig;
