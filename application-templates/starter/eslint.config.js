process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  ...mcAppConfig,

  // Template-specific overrides
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
