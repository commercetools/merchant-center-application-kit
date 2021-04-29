const fs = require('fs');
const os = require('os');
const path = require('path');
const execa = require('execa');
const Listr = require('listr');
const { throwIfTemplateVersionDoesNotExist } = require('../validations');

module.exports = function downloadTemplate(options) {
  return {
    title: 'Downloading template',
    task: () => {
      const tmpDir = os.tmpdir();
      const tmpFolderNameForClonedRepository = [
        'merchant-center-application-kit',
        '--',
        options.tagOrBranchVersion,
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
        options.templateName
      );
      return new Listr([
        {
          title: `Cloning repository using branch ${options.tagOrBranchVersion}`,
          task: async () => {
            // Shallow clone repository
            const result = await execa(
              'git',
              [
                'clone',
                `--branch=${options.tagOrBranchVersion}`,
                '--depth=1',
                'https://github.com/commercetools/merchant-center-application-kit.git',
                tmpFolderNameForClonedRepository,
              ],
              {
                cwd: tmpDir,
                encoding: 'utf-8',
              }
            );

            if (result.failed) {
              throw new Error(result.stderr);
            }

            throwIfTemplateVersionDoesNotExist(
              options.templateName,
              clonedRepositoryPath,
              options.tagOrBranchVersion
            );

            return result.stdout;
          },
        },
        {
          title: `Copying template ${options.templateName} into project directory ${options.projectDirectoryPath}`,
          task: async () => {
            const sanitizedProjectDirectoryPath = options.projectDirectoryPath
              // Escape white spaces
              .replace(/ /g, '\\ ');

            let result;
            if(process.platform == 'win32' || process.platform == 'cygwin') {
              result = await execa(
                'move',
                [templateFolderPath, sanitizedProjectDirectoryPath],
                {
                  encoding: 'utf-8',
                }
              );
            } else {
              result = await execa(
                'mv',
                [templateFolderPath, sanitizedProjectDirectoryPath],
                {
                  encoding: 'utf-8',
                }
              );
            }
            
            if (result.failed) {
              throw new Error(result.stderr);
            }
            const templatePackageJsonPath = path.join(
              options.projectDirectoryPath,
              'package.json'
            );
            if (!fs.existsSync(templatePackageJsonPath)) {
              throw new Error(
                `Unable to verify that the template application has a package.json at "${templatePackageJsonPath}"`
              );
            }
            return result.stdout;
          },
        },
      ]);
    },
  };
};
