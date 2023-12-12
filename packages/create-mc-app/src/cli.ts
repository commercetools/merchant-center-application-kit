import { cac } from 'cac';
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

const cli = cac('create-mc-app');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const messagesByApplicationType = {
  [applicationTypes['custom-application']]: {
    docsLink: 'https://docs.commercetools.com/custom-applications',
    featureName: 'Custom Application',
  },
  [applicationTypes['custom-view']]: {
    docsLink:
      'https://docs-beta-custom-views.commercetools.vercel.app/custom-views',
    featureName: 'Custom View',
  },
} as const;

const run = () => {
  // Default command
  cli
    .command('[project-directory]')
    .usage(
      '[project-directory]\n\n  Bootstraps a new project using one of the predefined templates.'
    )
    .option(
      '--application-type <type>',
      '(optional) The type of the application to create: custom-application (default) or custom-view.',
      { default: applicationTypes['custom-application'] }
    )
    .option(
      '--template <name>',
      '(optional) The name of the template to install.',
      { default: availableTemplates.starter }
    )
    .option(
      '--template-version <version>',
      '(optional) The version of the template to install (either a git tag or a git branch of the "commercetools/merchant-center-application-kit" repository).',
      { default: 'main' }
    )
    .option(
      '--skip-install',
      '(optional) Skip installing the dependencies after cloning the template.',
      { default: false }
    )
    .option(
      '--yes',
      '(optional) If set, the prompt options with default values will be skipped.',
      { default: false }
    )
    .option(
      '--entry-point-uri-path <value>',
      '(optional) The version of the template to install. (default: starter-<hash>)'
    )
    .option(
      '--initial-project-key <value>',
      '(optional) A commercetools project key used for the initial login in development. By default, the value is prompted in the terminal.'
    )
    .option(
      '--package-manager <value>',
      '(optional) The preferred package manager to use: npm, yarn, pnpm.'
    )
    .action(async (projectDirectory, options: TCliCommandOptions) => {
      if (!projectDirectory) {
        cli.outputHelp();
        return;
      }

      const releaseVersion = await getLatestReleaseVersion();

      hintOutdatedVersion(pkgJson.version, releaseVersion);

      const taskOptions = await processOptions(projectDirectory, options);
      const messages = messagesByApplicationType[taskOptions.applicationType];

      console.log('');
      console.log(`Documentation available at ${messages.docsLink}`);
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
        `Visit ${messages.docsLink} for more info about developing ${messages.featureName}. Enjoy 🚀`
      );
    });

  cli.help();
  cli.version(pkgJson.version);

  cli.parse();
};

export default run;
