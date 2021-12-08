const fs = require('fs');
const path = require('path');
const pug = require('pug');

const compileLoginView = pug.compileFile(
  path.join(__dirname, './views/login.pug')
);
const compileLogoutView = pug.compileFile(
  path.join(__dirname, './views/logout.pug')
);

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const paths = {
  appBuild: resolveApp('public'),
};

// This transformer will generate a development `login` and `logout` HTML files
// and copy them to the application public foder.
// This is necessary to run the application locally in production mode.
module.exports = ({ env }) => {
  const loginViewHtml = compileLoginView({ env });
  const logoutViewHtml = compileLogoutView({ env });

  fs.copyFileSync(
    path.join(__dirname, 'views', 'login.css'),
    path.join(paths.appBuild, 'login.css')
  );
  fs.copyFileSync(
    path.join(__dirname, 'views', 'login.js'),
    path.join(paths.appBuild, 'login.js')
  );
  fs.copyFileSync(
    path.join(__dirname, 'views', 'logout.js'),
    path.join(paths.appBuild, 'logout.js')
  );
  fs.writeFileSync(
    path.join(paths.appBuild, 'login.html'),
    loginViewHtml,
    'utf8'
  );
  fs.writeFileSync(
    path.join(paths.appBuild, 'logout.html'),
    logoutViewHtml,
    'utf8'
  );
};
