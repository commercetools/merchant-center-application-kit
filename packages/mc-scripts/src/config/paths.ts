import fs from 'fs';
import path from 'path';
import doesFileExist from '../utils/does-file-exist';

const moduleFileExtensions = ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx'];

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

// Resolve file paths in the order given
const resolveModule = (resolveFn: typeof resolveApp, filePath: string) => {
  const extension = moduleFileExtensions.find((extension) =>
    doesFileExist(resolveFn(`${filePath}.${extension}`))
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
  appBuild: resolveApp('public'),
  appIndexHtmlTemplate: resolveApp('public/index.html.template'),
  appIndexHtml: resolveApp('public/index.html'),
  appWebpackConfig: resolveModule(
    resolveApp,
    `webpack.config.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`
  ),
  yarnLockFile: resolveApp('yarn.lock'),
  appRoot: resolveApp('.'),
  entryPoint: resolveModule(resolveApp, 'src/index'),
  sourceFolders: [resolveApp('src')],
};

export default paths;
