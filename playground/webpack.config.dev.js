const path = require('path');
const createWebpackConfigForDevelopment = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
const sourceFolders = [
  path.resolve(__dirname, 'src'),
  // path.resolve(__dirname, '../packages'),
  // NOTE: we still need to include the materials folder in order for `postcss`
  // to compile the css module files.
  path.resolve(
    require.resolve('@commercetools-frontend/ui-kit'),
    '../../materials'
  ),
  // Fall back to main node_modules. This might be needed in case the playground
  // uses a different version of the ui-kit compared to the app-kit packages.
  // Consequently, yarn workspaces will now hoist the ui-kit package with the
  // different version. However, ui-kit imports from the app-kit packages should
  // still resolve to the main hoisted ui-kit package.
  path.resolve(
    __dirname,
    '../node_modules/@commercetools-frontend/ui-kit/materials'
  ),
];

module.exports = createWebpackConfigForDevelopment({
  distPath,
  entryPoint,
  sourceFolders,
});
