import os from 'node:os';
import path from 'node:path';
import execa from 'execa';
import { Listr, type ListrTask } from 'listr2';
import { applicationTypes } from '../constants';
import type { TCliTaskOptions } from '../types';
import { throwIfTemplateVersionDoesNotExist } from '../validations';
import { doesFileExist } from '../utils';

const filesToBeRemoved = ['CHANGELOG.md'];

function downloadTemplate(options: TCliTaskOptions): ListrTask {
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
        options.applicationType === applicationTypes['custom-view']
          ? 'custom-views-templates'
          : 'application-templates',
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
            const command =
              process.platform === 'win32' || process.platform === 'cygwin'
                ? 'move'
                : 'mv';
            const result = await execa(
              command,
              [
                templateFolderPath,
                // Wrap folder path in quotes to avoid issues with empty spaces in the folder names.
                options.projectDirectoryPath,
              ],
              {
                encoding: 'utf-8',
              }
            );

            if (result.failed) {
              throw new Error(result.stderr);
            }
            const templatePackageJsonPath = path.join(
              options.projectDirectoryPath,
              'package.json'
            );
            if (!doesFileExist(templatePackageJsonPath)) {
              throw new Error(
                `Unable to verify that the template application has a package.json at "${templatePackageJsonPath}"`
              );
            }
            return result.stdout;
          },
        },
        {
          title: `Cleaning up project directory`,
          task: async () => {
            const command =
              process.platform === 'win32' || process.platform === 'cygwin'
                ? 'del'
                : 'rm';
            const result = await execa(
              command,
              filesToBeRemoved.map((filePath) =>
                path.join(options.projectDirectoryPath, filePath)
              ),
              {
                encoding: 'utf-8',
              }
            );

            if (result.failed) {
              throw new Error(result.stderr);
            }
            return result.stdout;
          },
        },
      ]);
    },
  };
}

export default downloadTemplate;
