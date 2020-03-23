#!/usr/bin/env node

const mri = require('mri');
const Listr = require('listr');
const { shouldUseYarn } = require('../src/utils');
const tasks = require('../src/tasks');
const hintOutdatedVersion = require('../src/hint-outdated-version');
const parseArguments = require('../src/parse-arguments');
const pkg = require('../package.json');

const currentVersion = pkg.version;

async function execute() {
  const flags = mri(process.argv.slice(2), {
    alias: { help: ['h'] },
    default: { 'skip-install': false },
  });
  const commands = flags._;

  if (commands.length === 0 || (flags.help && commands.length === 0)) {
    console.log(`
  Usage: create-mc-app [project-directory] [flags]

  Displays help information.

  Options:

    --template <name>               (optional) The name of the template to install [default "starter"]
                                    Available options: ["starter"]
    --template-version <version>    (optional) The version of the template to install [default "master"]
    --skip-install                  (optional) Skip installing the dependencies after cloning the template [default "false"]
    `);
    process.exit(0);
  }
  console.log(`Version: v${currentVersion}`);
  hintOutdatedVersion(currentVersion);
  console.log('');
  const options = parseArguments(flags);

  const taskList = new Listr(
    [
      tasks.downloadTemplate(options),
      tasks.updatePackageInfo(options),
      !flags['skip-install'] && tasks.installDependencies(options),
    ].filter(Boolean)
  );

  await taskList.run();
  const useYarn = shouldUseYarn();

  console.log('');
  console.log(
    `🎉 🎉 🎉 The Merchant Center application ${options.projectDirectoryName} was successfully bootstrapped based on the ${options.templateName} template.`
  );
  console.log('');
  console.log(`To get started:`);
  console.log(`$ cd ${options.projectDirectoryName}`);
  if (flags['skip-install']) {
    console.log(`$ ${useYarn ? 'yarn' : 'npm'} install`);
  }
  console.log(`$ ${useYarn ? 'yarn' : 'npm'} start`);
  console.log('');
  console.log(
    `Visit https://docs.commercetools.com/custom-applications for more info about developing Custom Applications. Enjoy 🚀`
  );
}

execute()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
