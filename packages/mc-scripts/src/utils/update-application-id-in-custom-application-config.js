const fs = require('fs');
const rcfile = require('rcfile');
const prettier = require('prettier');
const babel = require('@babel/core');
const { getConfigPath } = require('@commercetools-frontend/application-config');

function updateApplicationIdInCustomApplicationConfig(applicationId) {
  const filePath = getConfigPath();
  if (filePath.endsWith('.json')) {
    const customApplicationConfig = require(filePath);
    customApplicationConfig.env.production.applicationId = applicationId;
    const prettierConfig = rcfile('prettier');
    const formattedData = prettier.format(
      JSON.stringify(customApplicationConfig),
      { ...prettierConfig, parser: 'json' }
    );
    fs.writeFileSync(filePath, formattedData, {
      encoding: 'utf8',
    });
    return;
  }

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
