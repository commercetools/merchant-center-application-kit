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
  --template=<name>     (optional) The name of the template to install [default "starter"]
                        Available options: ["starter"]
  `);
  process.exit(0);
}

const projectDirectoryName = commands[0];

if (!projectDirectoryName) {
  throw new Error('Missing required argument "<project-directory>"');
}
const templateName = flags.template || 'starter';
if (!availableTemplates.includes(templateName)) {
  throw new Error(
    `The provided template name "${templateName}" does not exist. Available templates are "${availableTemplates.toString()}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
  );
}

const projectDirectoryPath = path.resolve(projectDirectoryName);

if (fs.existsSync(projectDirectoryPath)) {
  throw new Error(
    `A directory named "${projectDirectoryName}" already exists at this location "${projectDirectoryPath}". Please choose a different project name or remove the directory, then try running the command again.`
  );
}

fs.mkdirSync(projectDirectoryPath);

console.log(
  `==> Creating a new Merchant Center application in ${projectDirectoryPath}.\n`
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

// TODO: we could check for min yarn/npm versions
// See https://github.com/facebook/create-react-app/blob/0f4781e8507249ce29a9ac1409fece67c1a53c38/packages/create-react-app/createReactApp.js#L225-L254

const templatePath = path.join(__dirname, '../templates', templateName);

try {
  execSync(`cp -R ${templatePath}/ ${projectDirectoryPath}/`);
} catch (error) {
  console.error(
    `Error while installing template "${templateName}" into "${projectDirectoryPath}":\n`,
    error
  );
}

// Enter inside the project directory
process.chdir(projectDirectoryPath);

// Change the package name based on the given project directory name
const appPackageJson = JSON.parse(
  fs.readFileSync(path.join(projectDirectoryPath, 'package.json'), {
    encoding: 'utf8',
  })
);
const updatedAppPackageJson = Object.assign({}, appPackageJson, {
  name: projectDirectoryName.toLowerCase().replace(/_/gi, '-'),
});
fs.writeFileSync(
  path.join(projectDirectoryPath, 'package.json'),
  JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
  { encoding: 'utf8' }
);

// Install the dependencies
try {
  execSync(`${useYarn ? 'yarn' : 'npm'} install`);
} catch (error) {
  console.error(
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
