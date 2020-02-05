/* eslint-disable no-console */
const path = require('path');
const {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
} = require('./validations');
const { isSemVer } = require('./utils');

module.exports = function parseArguments(flags) {
  const [projectDirectoryName] = flags._;
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
