const path = require('path');

// As we're running tests in `jsdom` environment, the internal logic
// of this package `css-functions-list` relies on some properties in
// the `document` object that are not available.
// Therefore, to keep things simple, we just mock the module, which
// returns the location of a JSON file.
const cssFunctionsListJsonFilePath = path.join(
  path.dirname(require.resolve('css-functions-list')),
  'index.json'
);

const location = cssFunctionsListJsonFilePath;

module.exports = location;
