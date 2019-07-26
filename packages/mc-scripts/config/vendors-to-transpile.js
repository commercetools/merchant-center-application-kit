// https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#esm-build
module.exports = [
  require.resolve('react-intl'),
  require.resolve('intl-messageformat'),
  require.resolve('intl-messageformat-parser'),
];
