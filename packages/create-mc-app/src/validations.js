const fs = require('fs');
const path = require('path');
const { isSemVer } = require('./utils');

const availableTemplates = ['starter'];

const throwIfTemplateIsNotSupported = templateName => {
  if (!availableTemplates.includes(templateName)) {
    throw new Error(
      `The provided template name "${templateName}" does not exist. Available templates are "${availableTemplates.toString()}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
    );
  }
};

const throwIfProjectDirectoryExists = (dirName, dirPath) => {
  if (fs.existsSync(dirPath)) {
    throw new Error(
      `A directory named "${dirName}" already exists at this location "${dirPath}". Please choose a different project name or remove the directory, then try running the command again.`
    );
  }
};

const throwIfTemplateVersionDoesNotExist = (
  templateName,
  templateFolderPath,
  versionToCheck
) => {
  if (!fs.existsSync(templateFolderPath)) {
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
        `The downloaded template "${templateName}" does not match the version "${versionAsNumber}", instead got "${
          templatePackageJson.version
        }". Check the releases page if you want to provide a specific version: https://github.com/commercetools/merchant-center-application-kit/releases`
      );
    }
  }
};

module.exports = {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfTemplateVersionDoesNotExist,
};
