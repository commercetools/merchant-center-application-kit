import { program } from 'commander';
import { Listr, type ListrTask } from 'listr2';
import pkgJson from '../package.json';
import { applicationTypes, availableTemplates } from './constants';
import getLatestReleaseVersion from './get-latest-release-version';
import hintOutdatedVersion from './hint-outdated-version';
import processOptions from './process-options';
import * as tasks from './tasks';
import type { TCliCommandOptions } from './types';
import { getPreferredPackageManager } from './utils';
import { throwIfNodeVersionIsNotSupported } from './validations';

throwIfNodeVersionIsNotSupported(process.versions.node, pkgJson.engines.node);

program
  .name('create-mc-app')
  .description(
    'CLI to create a new Merchant Center customizations project based on the pre-defined templates.'
  )
  .version(pkgJson.version);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const messagesByApplicationType = {
  [applicationTypes['custom-application']]: {
    featureName: 'Custom Application',
  },
  [applicationTypes['custom-view']]: {
    featureName: 'Custom View',
  },
} as const;

const run = () => {
  // Default command
  program
    .argument('<project-directory>')
    .option(
      '--application-type [type]',
      '(optional) The type of the application to create: custom-application (default) or custom-view.',
      applicationTypes['custom-application']
    )
    .option(
      '--template [name]',
      '(optional) The name of the template to install.',
      availableTemplates.starter
    )
    .option(
      '--template-version [version]',
      '(optional) The version of the template to install (either a git tag or a git branch of the "commercetools/merchant-center-application-kit" repository).',
      'main'
    )
    .option(
      '--skip-install',
      '(optional) Skip installing the dependencies after cloning the template.',
      false
    )
    .option(
      '--yes',
      '(optional) If set, the prompt options with default values will be skipped.',
      false
    )
    .option(
      '--entry-point-uri-path [value]',
      '(optional) The version of the template to install. (default: starter-<hash>)'
    )
    .option(
      '--initial-project-key [value]',
      '(optional) A commercetools project key used for the initial login in development. By default, the value is prompted in the terminal.'
    )
    .option(
      '--cloud-identifier [value]',
      '(optional) Cloud region identifier. By default, the value is prompted in the terminal'
    )
    .option(
      '--package-manager [value]',
      '(optional) The preferred package manager to use: npm, yarn, pnpm.'
    )
    .action(async (projectDirectory: string, options: TCliCommandOptions) => {
      const releaseVersion = await getLatestReleaseVersion();

      hintOutdatedVersion(pkgJson.version, releaseVersion);

      const taskOptions = await processOptions(projectDirectory, options);
      const messages = messagesByApplicationType[taskOptions.applicationType];

      console.log('');
      console.log(
        'Documentation available at https://docs.commercetools.com/merchant-center-customizations/'
      );
      console.log('');

      const shouldInstallDependencies =
        !options.skipInstall ||
        // TODO: remove once we manage to ensure the package manager is installed, for example via Corepack.
        options.packageManager === 'pnpm';

      const taskList = new Listr(
        [
          tasks.downloadTemplate(taskOptions),
          tasks.updatePackageJson(taskOptions, releaseVersion),
          tasks.updateApplicationConfig(taskOptions),
          tasks.updateApplicationConstants(taskOptions),
          shouldInstallDependencies && tasks.installDependencies(taskOptions),
        ].filter(Boolean) as ListrTask[]
      );

      await taskList.run();
      const packageManager = getPreferredPackageManager(taskOptions);

      console.log('');
      console.log(
        `🎉 🎉 🎉 The ${messages.featureName} has been created in the "${taskOptions.projectDirectoryName}" folder.`
      );
      console.log('');
      console.log(`To get started:`);
      console.log(`$ cd ${taskOptions.projectDirectoryName}`);
      if (!shouldInstallDependencies) {
        console.log(`$ ${packageManager} install`);
      }
      console.log(`$ ${packageManager} start`);
      console.log('');
      console.log(
        `Visit https://docs.commercetools.com/merchant-center-customizations/ for more info about developing ${messages.featureName}. Enjoy 🚀`
      );
    });

  program.parse();
};

export default run;
