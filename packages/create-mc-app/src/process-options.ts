import crypto from 'node:crypto';
import path from 'node:path';
import readline, { type Interface } from 'node:readline';
import { CLOUD_IDENTIFIERS } from '@commercetools-frontend/application-config';
import { applicationTypes } from './constants';
import type { TCliCommandOptions, TCliTaskOptions } from './types';
import { isSemVer } from './utils';
import {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfInitialProjectKeyIsMissing,
  throwIfApplicationTypeIsNotSupported,
  throwIfCloudRegionIsNotSupported,
} from './validations';

const question = (rl: Interface, value: string) =>
  new Promise<string>((resolve) => rl.question(value, resolve));

const getEntryPointUriPath = async (
  rl: Interface,
  options: TCliCommandOptions
) => {
  if (options.applicationType === applicationTypes['custom-view']) {
    return;
  }

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

const getCloudIdentifier = async (
  rl: Interface,
  options: TCliCommandOptions
) => {
  if (options.cloudIdentifier) {
    throwIfCloudRegionIsNotSupported(options.cloudIdentifier);
    return options.cloudIdentifier;
  }

  if (options.yes) {
    return CLOUD_IDENTIFIERS.GCP_EU;
  }

  const cloudIdentifier = await question(
    rl,
    'Provide the cloudIdentifier (default "gcp-eu"): '
  );
  if (!cloudIdentifier) {
    return CLOUD_IDENTIFIERS.GCP_EU;
  }
  throwIfCloudRegionIsNotSupported(cloudIdentifier);
  return cloudIdentifier;
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
  throwIfApplicationTypeIsNotSupported(options.applicationType);
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);

  // Read prompts
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const entryPointUriPath = await getEntryPointUriPath(rl, options);
  const initialProjectKey = await getInitialProjectKey(rl, options);
  const cloudIdentifier = await getCloudIdentifier(rl, options);
  rl.close();

  return {
    applicationType: options.applicationType,
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
    entryPointUriPath,
    initialProjectKey,
    cloudIdentifier,
    packageManager: options.packageManager,
  };
}

export default processOptions;
