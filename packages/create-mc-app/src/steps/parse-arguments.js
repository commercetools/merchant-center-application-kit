const path = require('path');
const mri = require('mri');
const logger = require('../logger');
const {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
} = require('../validations');
const { isSemVer } = require('../utils');

module.exports = function parseArguments() {
  logger.info(`🔍 Parsing command arguments...`);

  const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
  const commands = flags._;

  if (commands.length === 0 || (flags.help && commands.length === 0)) {
    logger.note(`
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

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
  };
};
