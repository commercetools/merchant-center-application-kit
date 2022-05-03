import fs from 'fs';
import path from 'path';
import type { TCompiledHtml } from './types';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import pages from /* preval */ './pages';

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);
const paths = {
  appBuild: resolveApp('public'),
};

// This transformer will generate a development `login` and `logout` HTML files
// and copy them to the application public folder.
// This is necessary to run the application locally in production mode.
const transformerLocal = (compiledHtml: TCompiledHtml) => {
  const htmlLogin = pages.loginPage.replace(
    new RegExp('__MC_API_URL__', 'g'),
    trimTrailingSlash(compiledHtml.env.mcApiUrl)
  );
  const htmlLogout = pages.logoutPage;

  fs.writeFileSync(path.join(paths.appBuild, 'login.html'), htmlLogin, 'utf8');
  fs.writeFileSync(
    path.join(paths.appBuild, 'logout.html'),
    htmlLogout,
    'utf8'
  );
};

export default transformerLocal;
