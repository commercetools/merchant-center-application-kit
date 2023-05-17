import crypto from 'crypto';
import path from 'path';
import readline, { type Interface } from 'readline';
import type { TCliCommandOptions, TCliTaskOptions } from './types';
import { isSemVer } from './utils';
import {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfInitialProjectKeyIsMissing,
  throwIfPackageManagerVersionIsMissing,
} from './validations';

const question = (rl: Interface, value: string) =>
  new Promise<string>((resolve) => rl.question(value, resolve));

const getEntryPointUriPath = async (
  rl: Interface,
  options: TCliCommandOptions
) => {
  if (options.entryPointUriPath) {
    return options.entryPointUriPath;
  }

  const randomEntryPointUriPath = `${options.template}-${crypto
    .randomBytes(3)
    .toString('hex')}`;

  if (options.yes) {
    return randomEntryPointUriPath;
  }

  const answerEntryPointUriPath = await question(
    rl,
    `Provide the Custom Application entryPointUriPath (default "${randomEntryPointUriPath}"): `
  );
  return answerEntryPointUriPath || randomEntryPointUriPath;
};

const getInitialProjectKey = async (
  rl: Interface,
  options: TCliCommandOptions
) => {
  if (options.initialProjectKey) {
    return options.initialProjectKey;
  }

  const initialProjectKey = await question(
    rl,
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
  let tagOrBranchVersion = options.templateVersion || 'main';
  tagOrBranchVersion =
    isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
      ? `v${tagOrBranchVersion}`
      : tagOrBranchVersion;

  const templateName = options.template;

  // Validate options
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);
  throwIfPackageManagerVersionIsMissing(
    options.packageManager,
    options.packageManagerVersion
  );

  // Read prompts
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const entryPointUriPath = await getEntryPointUriPath(rl, options);
  const initialProjectKey = await getInitialProjectKey(rl, options);
  rl.close();

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
    entryPointUriPath,
    initialProjectKey,
    packageManager: options.packageManager,
    packageManagerVersion: options.packageManagerVersion,
  };
}

export default processOptions;
