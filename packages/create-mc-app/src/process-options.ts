import path from 'path';
import readline from 'readline';
import crypto from 'crypto';
import {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfInitialProjectKeyIsMissing,
} from './validations';
import { isSemVer } from './utils';
import type { TCliCommandOptions, TCliTaskOptions } from './types';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (value: string) =>
  new Promise<string>((resolve) => rl.question(value, resolve));

const getTemplateName = (options: TCliCommandOptions) =>
  options.template || 'starter';

const getEntryPointUriPath = async (options: TCliCommandOptions) => {
  if (options['entry-point-uri-path']) {
    return options['entry-point-uri-path'];
  }

  const templateName = getTemplateName(options);
  const randomEntryPointUriPath = `${templateName}-${crypto
    .randomBytes(3)
    .toString('hex')}`;

  if (options.yes) {
    return randomEntryPointUriPath;
  }

  const answerEntryPointUriPath = await question(
    `Provide the Custom Application entryPointUriPath (default "${randomEntryPointUriPath}"): `
  );
  return answerEntryPointUriPath || randomEntryPointUriPath;
};

const getInitialProjectKey = async (options: TCliCommandOptions) => {
  if (options['initial-project-key']) {
    return options['initial-project-key'];
  }

  const initialProjectKey = await question(
    `Provide the initial project key for local development: `
  );

  throwIfInitialProjectKeyIsMissing(initialProjectKey);

  return initialProjectKey;
};

async function processOptions(
  projectDirectoryName: string,
  options: TCliCommandOptions
): Promise<TCliTaskOptions> {
  if (!projectDirectoryName) {
    throw new Error('Missing required argument "[project-directory]"');
  }
  const projectDirectoryPath = path.resolve(projectDirectoryName);

  // Parse options
  const templateName = getTemplateName(options);
  let tagOrBranchVersion = options['template-version'] || 'main';
  tagOrBranchVersion =
    isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
      ? `v${tagOrBranchVersion}`
      : tagOrBranchVersion;

  // Validate options
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);

  // Read prompts
  const entryPointUriPath = await getEntryPointUriPath(options);
  const initialProjectKey = await getInitialProjectKey(options);

  rl.close();

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
    entryPointUriPath,
    initialProjectKey,
  };
}

export default processOptions;
