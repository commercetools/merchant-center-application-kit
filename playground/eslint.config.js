/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
