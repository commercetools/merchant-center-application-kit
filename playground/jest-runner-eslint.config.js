module.exports = {
  cliOptions: {
    format: 'node_modules/eslint-formatter-pretty',
    rules: {
      'prettier/prettier': [
        'error',
        { trailingComma: 'es5', singleQuote: true },
      ],
    },
  },
};
