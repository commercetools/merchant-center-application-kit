const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const matchingPackages = /^@commercetools-frontend\/(?!ui-kit)(.*)/;
const applicationName = 'my-starter-app';
const rootPath = path.join(__dirname, '..');
const tarballsDistPath = path.join(rootPath, 'dist-tarballs');
const sandboxPath = path.join(rootPath, '..', 'sandbox-installation-template');
const binaryPath = path.join(sandboxPath, 'node_modules/.bin/create-mc-app');
const applicationPath = path.join(sandboxPath, applicationName);

const templateName = process.env.TEMPLATE_NAME;
if (!templateName) {
  throw new Error('Missing required environment variable "TEMPLATE_NAME"');
}
const initialProjectKey = process.env.CTP_INITIAL_PROJECT_KEY;
if (!initialProjectKey) {
  throw new Error(
    'Missing required environment variable "CTP_INITIAL_PROJECT_KEY"'
  );
}

if (!fs.existsSync(tarballsDistPath)) {
  throw new Error(
    'The dist-tarballs folder does not exist. Please run the build-tarballs.js script before this.'
  );
}

const branchName =
  process.env.GITHUB_EVENT_NAME === 'pull_request'
    ? process.env.GITHUB_HEAD_REF
    : 'main';

console.log('Cleaning up sandbox folder');
shelljs.rm('-rf', sandboxPath);
shelljs.mkdir('-p', sandboxPath);

const createMcAppTarballName = shelljs
  .ls(tarballsDistPath)
  .find((tarballName) => tarballName.includes('create-mc-app'));
if (!createMcAppTarballName) {
  throw new Error('Failed to find tarball for create-mc-app package');
}

console.log(`Installing create-mc-app from tarball`);
shelljs.exec(
  [
    'yarn add',
    `file:${path.join(tarballsDistPath, createMcAppTarballName)}`,
    '--no-lockfile',
  ].join(' '),
  { cwd: sandboxPath, stdio: 'ignore' }
);

console.log(
  `Bootstrapping the application ${applicationName} using the template ${templateName}.`
);
shelljs.exec(
  [
    binaryPath,
    applicationName,
    '--template=starter',
    `--template-version=${branchName}`,
    `--initial-project-key=${initialProjectKey}`,
    `--yes`,
    // Don't install deps automatically, we need to patch the package.json to use the
    // local tarballs for resolving the dependencies.
    '--skip-install',
  ].join(' '),
  { cwd: sandboxPath }
);

console.log(
  'Patching the application package.json to use local imports for appkit dependencies'
);
const appPackageJsonPath = path.join(applicationPath, 'package.json');
const appPackageJson = require(appPackageJsonPath);
const tarballNames = shelljs.ls(tarballsDistPath);
const patchDependencyImportPath = (depName, dependencies) => {
  if (matchingPackages.test(depName)) {
    const matchingTarballName = tarballNames.find((tarballName) => {
      const [, packageNameWithoutScope] = depName.split(
        '@commercetools-frontend/'
      );
      return tarballName.includes(packageNameWithoutScope);
    });
    dependencies[depName] = `file:${path.join(
      tarballsDistPath,
      matchingTarballName
    )}`;
  }
};
Object.keys(appPackageJson.dependencies).forEach((depName) => {
  patchDependencyImportPath(depName, appPackageJson.dependencies);
});
Object.keys(appPackageJson.devDependencies || {}).forEach((depName) => {
  patchDependencyImportPath(depName, appPackageJson.devDependencies);
});
fs.writeFileSync(appPackageJsonPath, JSON.stringify(appPackageJson, null, 2), {
  encoding: 'utf8',
});

console.log('Installing the application dependencies');
shelljs.exec('yarn install --no-lockfile', { cwd: applicationPath });

console.log(
  `Building the production bundle for the application ${applicationName}, using the tempalte ${templateName}`
);
shelljs.exec('yarn build', { cwd: applicationPath });
