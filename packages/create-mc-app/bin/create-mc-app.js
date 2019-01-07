#!/usr/bin/env node

/* eslint-disable no-console, prefer-object-spread/prefer-object-spread */

const path = require('path');
const fs = require('fs');
const os = require('os');
const execSync = require('child_process').execSync;
const mri = require('mri');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

const availableTemplates = ['starter'];

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
  Usage: create-mc-app [project-directory] [options]

  Options:
  --template=<name>                (optional) The name of the template to install [default "starter"]
                                   Available options: ["starter"]
  --template-version=<version>     (optional) The version of the template to install [default "latest"]
  `);
  process.exit(0);
}

const projectDirectoryName = commands[0];

if (!projectDirectoryName) {
  throw new Error('Missing required argument "<project-directory>"');
}

const throwIfTemplateIsNotSupported = templateName => {
  if (!availableTemplates.includes(templateName)) {
    throw new Error(
      `The provided template name "${templateName}" does not exist. Available templates are "${availableTemplates.toString()}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
    );
  }
};
const templateName = flags.template || 'starter';
throwIfTemplateIsNotSupported(templateName);

const throwIfProjectDirectoryExists = (dirName, dirPath) => {
  if (fs.existsSync(dirPath)) {
    throw new Error(
      `A directory named "${dirName}" already exists at this location "${dirPath}". Please choose a different project name or remove the directory, then try running the command again.`
    );
  }
};
const projectDirectoryPath = path.resolve(projectDirectoryName);
throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);

fs.mkdirSync(projectDirectoryPath);

console.log(
  `==> Creating a new Merchant Center application in ${projectDirectoryPath}\n`
);

const shouldUseYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

const useYarn = shouldUseYarn();
const packageManager = useYarn ? 'yarn' : 'npm';

// TODO: we could check for min yarn/npm versions
// See https://github.com/facebook/create-react-app/blob/0f4781e8507249ce29a9ac1409fece67c1a53c38/packages/create-react-app/createReactApp.js#L225-L254

const isSemVer = version => /^(v?)([0-9].[0-9].[0-9])+/.test(version);
let tagOrBranchVersion = flags['template-version'] || 'master';
tagOrBranchVersion =
  isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
    ? `v${tagOrBranchVersion}`
    : tagOrBranchVersion;

console.log(
  `==> Downloading template ${templateName} for version ${tagOrBranchVersion}\n`
);

const throwIfTemplateVersionDoesNotExist = (
  templateFolderPath,
  versionToCheck
) => {
  if (!fs.existsSync(templateFolderPath)) {
    throw new Error(
      `The downloaded template "${templateName}" does not exist for the given version "${versionToCheck}". Check the releases page if you are looking for a specific version: https://github.com/commercetools/merchant-center-application-kit/releases`
    );
  }
  // In case the version is semver (usually release tags) we check that
  // the cloned repository contains the template matching the given version
  if (isSemVer(versionToCheck)) {
    const templatePackageJson = JSON.parse(
      fs.readFileSync(path.join(templateFolderPath, 'package.json'), {
        encoding: 'utf8',
      })
    );
    const versionAsNumber = versionToCheck.replace('v', '');
    if (templatePackageJson.version !== versionAsNumber) {
      throw new Error(
        `The downloaded template "${templateName}" does not match the version "${versionAsNumber}", instead got "${
          templatePackageJson.version
        }". Check the releases page if you want to provide a specific version: https://github.com/commercetools/merchant-center-application-kit/releases`
      );
    }
  }
};
const tmpDir = os.tmpdir();
const tmpFolderNameForClonedRepository = [
  'merchant-center-application-kit',
  '--',
  tagOrBranchVersion,
  '--',
  Date.now().toString(),
].join('');
const clonedRepositoryPath = path.join(
  tmpDir,
  tmpFolderNameForClonedRepository
);
const templateFolderPath = path.join(
  clonedRepositoryPath,
  'application-templates',
  templateName
);
execSync(
  [
    'git clone',
    `--branch=${tagOrBranchVersion}`,
    '--depth=1',
    'https://github.com/commercetools/merchant-center-application-kit.git',
    tmpFolderNameForClonedRepository,
  ].join(' '),
  {
    cwd: tmpDir,
    stdio: 'ignore',
  }
);
throwIfTemplateVersionDoesNotExist(clonedRepositoryPath, tagOrBranchVersion);

try {
  execSync(`cp -R ${templateFolderPath}/ ${projectDirectoryPath}/`);
} catch (error) {
  throw new Error(
    `Error while installing template "${templateName}" into "${projectDirectoryPath}":\n`,
    error
  );
}

// Enter inside the project directory
process.chdir(projectDirectoryPath);

console.log(`==> Updating package name\n`);
// Change the package name based on the given project directory name
const appPackageJson = JSON.parse(
  fs.readFileSync(path.join(projectDirectoryPath, 'package.json'), {
    encoding: 'utf8',
  })
);
const updatedAppPackageJson = Object.assign({}, appPackageJson, {
  // Given the package name is derived from the `projectDirectoryName`
  // the latter needs to be sanitised to have a ensure a valid package name.
  // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
  // as a result the package name potentially needs to be altered when derived.
  name: projectDirectoryName.toLowerCase().replace(/_/gi, '-'),
});
fs.writeFileSync(
  path.join(projectDirectoryPath, 'package.json'),
  JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
  { encoding: 'utf8' }
);

console.log(`==> Installing dependencies\n`);
// Install the dependencies
try {
  execSync(`${packageManager} install`);
} catch (error) {
  throw new Error(
    `Error while installing dependencies in "${projectDirectoryPath}":\n`,
    error
  );
}

// Print instructions
console.log(
  `\nSuccess! The Merchant Center application ${projectDirectoryName} was created based on the ${templateName} template.\n`
);
console.log('Have a look at the README to check how to get started.\n');
// TODO: link to documentation website
