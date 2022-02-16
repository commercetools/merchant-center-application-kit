/* eslint-disable no-console */
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');
const {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfInitialProjectKeyIsMissing,
} = require('./validations');
const { isSemVer } = require('./utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const getTemplateName = (flags) => flags.template || 'starter';
const getEntryPointUriPath = async (flags) => {
  if (flags['entry-point-uri-path']) {
    return flags['entry-point-uri-path'];
  }

  const templateName = getTemplateName(flags);
  const randomEntryPointUriPath = `${templateName}-${crypto
    .randomBytes(3)
    .toString('hex')}`;

  if (flags.yes) {
    return randomEntryPointUriPath;
  }

  const answerEntryPointUriPath = await question(
    `Provide the Custom Application entryPointUriPath (default "${randomEntryPointUriPath}"): `
  );
  return answerEntryPointUriPath || randomEntryPointUriPath;
};
const getInitialProjectKey = async (flags) => {
  if (flags['initial-project-key']) {
    return flags['initial-project-key'];
  }

  const initialProjectKey = await question(
    `Provide the initial project key for local development: `
  );

  throwIfInitialProjectKeyIsMissing(initialProjectKey);

  return initialProjectKey;
};

module.exports = async function parseArguments(flags) {
  const [projectDirectoryName] = flags._;
  if (!projectDirectoryName) {
    throw new Error('Missing required argument "<project-directory>"');
  }
  const projectDirectoryPath = path.resolve(projectDirectoryName);

  // Parse options
  const templateName = getTemplateName(flags);
  let tagOrBranchVersion = flags['template-version'] || 'main';
  tagOrBranchVersion =
    isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
      ? `v${tagOrBranchVersion}`
      : tagOrBranchVersion;

  // Validate options
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);

  // Read prompts
  const entryPointUriPath = await getEntryPointUriPath(flags);
  const initialProjectKey = await getInitialProjectKey(flags);

  rl.close();

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
    entryPointUriPath,
    initialProjectKey,
  };
};
