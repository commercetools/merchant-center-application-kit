import { cac } from 'cac';
import { Listr, ListrTask } from 'listr2';
import * as tasks from './tasks';
import { throwIfNodeVersionIsNotSupported } from './validations';
import { shouldUseYarn } from './utils';
import hintOutdatedVersion from './hint-outdated-version';
import processOptions from './process-options';
import { TCliCommandOptions } from './types';
import pkgJson from '../package.json';

throwIfNodeVersionIsNotSupported(process.versions.node, pkgJson.engines.node);

const cli = cac('create-mc-app');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const run = () => {
  cli.help();
  cli.version(pkgJson.version);

  // Default command
  cli
    .command('[project-directory]')
    .usage(
      '[project-directory]\n\n  Bootstraps a new Custom Application project using one of the predefined templates.'
    )
    .option(
      '--template <name>',
      '(optional) The name of the template to install [default "starter"]'
    )
    .option(
      '--template-version <version>',
      '(optional) The version of the template to install [default "main"]'
    )
    .option(
      '--skip-install',
      '(optional) Skip installing the dependencies after cloning the template [default "false"]'
    )
    .option(
      '--yes',
      '(optional) If set, the prompt options with default values will be skipped. [default "false"]'
    )
    .option(
      '--entry-point-uri-path <value>',
      '(optional) The version of the template to install [default "starter-<hash>"]'
    )
    .option(
      '--initial-project-key <value>',
      '(optional) A commercetools project key used for the initial login in development. By default, the value is prompted in the terminal.'
    )
    .action(async (projectDirectory, options: TCliCommandOptions) => {
      hintOutdatedVersion(pkgJson.version);

      console.log('');
      console.log(
        `Documentation available at https://docs.commercetools.com/custom-applications`
      );
      console.log('');

      const taskOptions = await processOptions(projectDirectory, options);

      const taskList = new Listr(
        [
          tasks.downloadTemplate(taskOptions),
          tasks.updatePackageJson(taskOptions),
          tasks.updateCustomApplicationConfig(taskOptions),
          tasks.updateApplicationConstants(taskOptions),
          !options['skip-install'] && tasks.installDependencies(taskOptions),
        ].filter(Boolean) as ListrTask[]
      );

      await taskList.run();
      const useYarn = shouldUseYarn();

      console.log('');
      console.log(
        `🎉 🎉 🎉 The Custom Application has been created in the "${taskOptions.projectDirectoryName}" folder.`
      );
      console.log('');
      console.log(`To get started:`);
      console.log(`$ cd ${taskOptions.projectDirectoryName}`);
      if (options['skip-install']) {
        console.log(`$ ${useYarn ? 'yarn' : 'npm'} install`);
      }
      console.log(`$ ${useYarn ? 'yarn' : 'npm'} start`);
      console.log('');
      console.log(
        `Visit https://docs.commercetools.com/custom-applications for more info about developing Custom Applications. Enjoy 🚀`
      );
    });

  cli.parse();
};

export default run;
