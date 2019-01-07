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

  try {
    execSync(`mv ${templateFolderPath} ${projectDirectoryPath}`);
  } catch (error) {
    throw new Error(
      `Error while installing template "${templateName}" into "${projectDirectoryPath}":\n`,
      error
    );
  }
};
