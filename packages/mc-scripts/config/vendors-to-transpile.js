// https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#esm-build
const resolvePathToPackageDir = (packageName) =>
  require
    .resolve(packageName)
    // `require.resolve` points to the entry point file of the package, which
    // means we need to "cut" the path from the package directory onwards.
    .replace(new RegExp(`(.*)/${packageName}/(.*)`), `$1/${packageName}`);

module.exports = [resolvePathToPackageDir('react-intl')];
