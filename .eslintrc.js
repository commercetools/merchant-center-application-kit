process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  plugins: ['graphql'],
  overrides: [
    {
      files: ['**/*.mc.graphql'],
      rules: {
        'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            schemaJson: require('./schemas/mc.json'),
          },
        ],
      },
    },
    {
      files: ['**/*.ctp.graphql'],
      rules: {
        'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            schemaJson: require('./schemas/ctp.json'),
          },
        ],
      },
    },
    {
      files: ['**/*.core.graphql'],
      rules: {
        'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            schemaJson: require('./schemas/core.json'),
          },
        ],
      },
    },
    {
      files: ['**/*.settings.graphql'],
      rules: {
        'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            schemaJson: require('./schemas/settings.json'),
          },
        ],
      },
    },
    {
      files: ['**/*.proxy.graphql'],
      rules: {
        'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            schemaJson: require('./schemas/proxy.json'),
          },
        ],
      },
    },
  ],
};
