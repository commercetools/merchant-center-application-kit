process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  ...mcAppConfig,
  {
    files: ['**/*.{js,jsx,tsx}'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: { 'import/extensions': 'off' },
  },
];
