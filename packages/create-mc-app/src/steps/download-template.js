const fs = require('fs');
const os = require('os');
const path = require('path');
const execSync = require('child_process').execSync;
const logger = require('../logger');
const { throwIfTemplateVersionDoesNotExist } = require('../validations');

module.exports = function downloadTemplate({
  projectDirectoryPath,
  templateName,
  tagOrBranchVersion,
}) {
  logger.info(`💻 Downloading template ${templateName}...`);

  const tmpDir = os.tmpdir();
  const tmpFolderNameForClonedRepository = [
    'merchant-center-application-kit',
    '--',
    tagOrBranchVersion,
    '--',
    Date.now().toString(),
  ].join('');
  const clonedRepositoryPath = path.join(
    tmpDir,
    tmpFolderNameForClonedRepository
  );
  const templateFolderPath = path.join(
    clonedRepositoryPath,
    'application-templates',
    templateName
  );

  // Shallow clone repository
  execSync(
    [
      'git clone',
      `--branch=${tagOrBranchVersion}`,
      '--depth=1',
      'https://github.com/commercetools/merchant-center-application-kit.git',
      tmpFolderNameForClonedRepository,
    ].join(' '),
    {
      cwd: tmpDir,
      stdio: 'ignore',
    }
  );

  throwIfTemplateVersionDoesNotExist(
    templateName,
    clonedRepositoryPath,
    tagOrBranchVersion
  );

  const sanitizedProjectDirectoryPath = projectDirectoryPath
    // Escape white spaces
    .replace(/ /g, '\\ ');
  try {
    execSync(`mv ${templateFolderPath} ${sanitizedProjectDirectoryPath}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    throw new Error(
      `Could not copy template "${templateName}" into "${sanitizedProjectDirectoryPath}"`
    );
  }

  const templatePackageJsonPath = path.join(
    projectDirectoryPath,
    'package.json'
  );
  if (!fs.existsSync(templatePackageJsonPath)) {
    throw new Error(
      `Unable to verify that the template application has a package.json at "${templatePackageJsonPath}"`
    );
  }
};
