/* eslint-disable no-console */
const path = require('path');
const mri = require('mri');
const pkg = require('../../package.json');
const logger = require('../logger');
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
  Usage: create-mc-app [project-directory] [flags]

  Displays help information.

  Options:

    --template <name>                (optional) The name of the template to install [default "starter"]
                                     Available options: ["starter"]
    --template-version <version>     (optional) The version of the template to install [default "master"]
    `);
    process.exit(0);
  }

  logger.log(`Version: v${pkg.version}`);
  logger.log();
  logger.info(`🔍 Parsing command arguments...`);

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

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
  };
};
