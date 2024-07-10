import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';
import { CLOUD_IDENTIFIERS } from '@commercetools-frontend/application-config';
import { applicationTypes, availableTemplates } from './constants';
import type { TApplicationType, TTemplate } from './types';
import { isSemVer, doesFileExist } from './utils';

const throwIfApplicationTypeIsNotSupported = (
  applicationType: TApplicationType
) => {
  const applicationTypesList = Object.keys(applicationTypes);
  if (!Object.values(applicationTypesList).includes(applicationType)) {
    throw new Error(
      `The provided application type "${applicationType.toString()}" does not exist. Available types are "${applicationTypesList}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
    );
  }
};

const throwIfTemplateIsNotSupported = (templateName: TTemplate) => {
  switch (templateName) {
    case availableTemplates.starter:
    case availableTemplates['starter-typescript']:
      break;
    default: {
      const templateNamesList = Object.keys(availableTemplates).toString();
      throw new Error(
        `The provided template name "${templateName}" does not exist. Available templates are "${templateNamesList}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
      );
    }
  }
};

const throwIfProjectDirectoryExists = (dirName: string, dirPath: string) => {
  if (doesFileExist(dirPath)) {
    throw new Error(
      `A directory named "${dirName}" already exists at this location "${dirPath}". Please choose a different project name or remove the directory, then try running the command again.`
    );
  }
};

const throwIfTemplateVersionDoesNotExist = (
  templateName: string,
  templateFolderPath: string,
  versionToCheck: string
) => {
  if (!doesFileExist(templateFolderPath)) {
    throw new Error(
      `The downloaded template "${templateName}" does not exist for the given version "${versionToCheck}". Check the releases page if you are looking for a specific version: https://github.com/commercetools/merchant-center-application-kit/releases`
    );
  }
  // In case the version is semver (usually release tags) we check that
  // the cloned repository contains the template matching the given version
  if (isSemVer(versionToCheck)) {
    const templatePackageJson = JSON.parse(
      fs.readFileSync(path.join(templateFolderPath, 'package.json'), {
        encoding: 'utf8',
      })
    );
    const versionAsNumber = versionToCheck.replace('v', '');
    if (templatePackageJson.version !== versionAsNumber) {
      throw new Error(
        `The downloaded template "${templateName}" does not match the version "${versionAsNumber}", instead got "${templatePackageJson.version}". Check the releases page if you want to provide a specific version: https://github.com/commercetools/merchant-center-application-kit/releases`
      );
    }
  }
};

const throwIfInitialProjectKeyIsMissing = (initialProjectKey?: string) => {
  if (!initialProjectKey) {
    throw new Error(`Provide a valid project key that you have access to.`);
  }
};

const throwIfNodeVersionIsNotSupported = (
  currentNodeVersion: string,
  expectedVersionRange: string
) => {
  const hasValidNodeVersion = semver.satisfies(
    currentNodeVersion,
    expectedVersionRange
  );

  if (!hasValidNodeVersion) {
    throw new Error(
      `You are running Node ${currentNodeVersion} but create-mc-app requires Node ${expectedVersionRange}. Please update your version of Node.`
    );
  }
};

const throwIfCloudIdentifierIsNotSupported = (cloudIdentifier: string) => {
  const allowedCloudIdentifiers = Object.values(CLOUD_IDENTIFIERS) as string[];

  if (!allowedCloudIdentifiers.includes(cloudIdentifier)) {
    throw new Error(
      `The cloud region "${cloudIdentifier}" is not supported. Supported regions are: ${allowedCloudIdentifiers.join(
        ', '
      )}.`
    );
  }
};

export {
  throwIfApplicationTypeIsNotSupported,
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfTemplateVersionDoesNotExist,
  throwIfInitialProjectKeyIsMissing,
  throwIfNodeVersionIsNotSupported,
  throwIfCloudIdentifierIsNotSupported,
};
