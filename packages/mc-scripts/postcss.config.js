const path = require('path');
const { browserslist } = require('./package.json');

// This function aims to return the same result as `require.resolve`.
// However, resolving a path to a `.css` file does not return the real
// path when this file is executed within a Jest environment, because
// of the `identity-obj-proxy` resolver.
// Therefore, we trick it by resolving the package entry point and
// constructing the real path manually.
const safeResolvePath = (packageName, fileRelativePath) => {
  const defaultPackageEntryPoint = require.resolve(packageName);
  const [pathToPackage] = defaultPackageEntryPoint.split('dist');
  return path.join(pathToPackage, fileRelativePath);
};

module.exports = {
  parser: false,
  map: false,
  plugins: [
    require('postcss-import')(),
    require('autoprefixer')({
      grid: 'autoplace',
      overrideBrowserslist: browserslist.development,
    }),
    require('postcss-custom-media')({
      importFrom: safeResolvePath(
        '@commercetools-frontend/application-components',
        'materials/media-queries.css'
      ),
    }),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: safeResolvePath(
        '@commercetools-uikit/design-system',
        'materials/custom-properties.css'
      ),
    }),
    require('postcss-color-mod-function')(),
    require('postcss-reporter')(),
  ],
};
