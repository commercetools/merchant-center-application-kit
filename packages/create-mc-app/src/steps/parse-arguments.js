/* eslint-disable no-console */

const path = require('path');
const mri = require('mri');
const {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
} = require('../validations');
const { isSemVer } = require('../utils');

module.exports = function parseArguments() {
  const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
  const commands = flags._;

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
  const projectDirectoryPath = path.resolve(projectDirectoryName);

  // Parse options
  const templateName = flags.template || 'starter';
  let tagOrBranchVersion = flags['template-version'] || 'master';
  tagOrBranchVersion =
    isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
      ? `v${tagOrBranchVersion}`
      : tagOrBranchVersion;

  // Validate options
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);

  const options = {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
  };

  console.log(`==> Creating a new Merchant Center application with options:`);
  console.log(JSON.stringify(options, null, 2));
  console.log();

  return options;
};
