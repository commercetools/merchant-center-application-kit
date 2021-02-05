const fs = require('fs');
const path = require('path');

const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const paths = {
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appBuild: resolveApp('dist/assets'),
  appIndexHtmlTemplate: resolveApp('dist/assets/index.html'),
  appWebpackConfig: resolveApp(
    `webpack.config.${
      process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
    }.js`
  ),
  yarnLockFile: resolveApp('yarn.lock'),
  appRoot: resolveApp('.'),
  distPath: resolveApp('dist'),
  entryPoint: resolveModule(resolveApp, 'src/index'),
  sourceFolders: [resolveApp('src')],
};

module.exports = paths;
