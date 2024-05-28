import fs from 'fs';
import path from 'path';
import { cac } from 'cac';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import pkgJson from '../package.json';
import type {
  TCliGlobalOptions,
  TCliCommandBuildOptions,
  TCliCommandCompileHtmlOptions,
  TCliCommandConfigSyncOptions,
  TCliCommandPushDeploymentPreviewOptions,
} from './types';
import doesFileExist from './utils/does-file-exist';

const cli = cac('mc-scripts');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Get the current directory where the CLI is executed from. Usually this is the application folder.
const applicationDirectory = fs.realpathSync(process.cwd());

async function run() {
  cli.option(
    '--env <path>',
    `(optional) Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.`
  );

  // Default command
  cli
    .command('')
    .usage('\n\n  Develop and build Custom Applications.')
    .action(() => {
      cli.outputHelp();
    });

  // Command: start
  const usageStart =
    'Starts the application in development mode using Webpack Dev Server.';
  cli
    .command('start', usageStart)
    .usage(`\n\n  ${usageStart}`)
    .alias('dev')
    .action(async (options: TCliGlobalOptions) => {
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(options);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.BABEL_ENV = 'development';
      process.env.NODE_ENV = 'development';

      const shouldUseExperimentalBundler =
        process.env.ENABLE_EXPERIMENTAL_VITE_BUNDLER === 'true';
      if (shouldUseExperimentalBundler) {
        console.log('Experimental Vite bundler enabled! 🚀');
        console.log('');
      }

      const startCommand = shouldUseExperimentalBundler
        ? await import('./commands/start-vite')
        : await import('./commands/start');
      await startCommand.default();
    });

  // Command: build
  const usageBuild =
    'Bundles the application in production mode. Outputs a "public" folder.';
  cli
    .command('build', usageBuild)
    .usage(`\n\n  ${usageBuild}`)
    .option(
      '--build-only',
      '(optional) If defined, the command only creates the production bundles without compiling the "index.html".',
      { default: false }
    )
    .action(async (options: TCliCommandBuildOptions & TCliGlobalOptions) => {
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(options);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.BABEL_ENV = 'production';
      process.env.NODE_ENV = 'production';

      const shouldUseExperimentalBundler =
        process.env.ENABLE_EXPERIMENTAL_VITE_BUNDLER === 'true';
      if (shouldUseExperimentalBundler) {
        console.log('Experimental Vite bundler enabled! 🚀');
        console.log('');
      }

      const buildCommand = shouldUseExperimentalBundler
        ? await import('./commands/build-vite')
        : await import('./commands/build');
      await buildCommand.default();

      const shouldAlsoCompile = !options.buildOnly;
      if (shouldAlsoCompile) {
        console.log('');
        const compileHtmlCommand = await import('./commands/compile-html');
        await compileHtmlCommand.default({ printSecurityHeaders: false });
      }
    });

  // Command: compile-html
  const usageCompileHtml =
    'Compiles "index.html.template" file into a "index.html" with all the required runtime configuration. The security headers are also compiled and injected into the "index.html".';
  cli
    .command('compile-html', usageCompileHtml)
    .usage(`\n\n  ${usageCompileHtml}`)
    .option(
      '--transformer <path>',
      '(optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Vercel, Netlify).'
    )
    .option(
      '--print-security-headers',
      '(optional) If defined, the compiled security headers are printed to stdout.',
      { default: false }
    )
    .action(
      async (options: TCliCommandCompileHtmlOptions & TCliGlobalOptions) => {
        // Load dotenv files into the process environment.
        // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
        loadDotEnvFiles(options);

        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        const compileHtmlCommand = await import('./commands/compile-html');
        await compileHtmlCommand.default(options);
      }
    );

  // Command: serve
  const usageServe =
    'Serves previously built and compiled application from the "public" folder.';
  cli
    .command('serve', usageServe)
    .usage(`\n\n  ${usageServe}`)
    .action(async (options: TCliGlobalOptions) => {
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(options);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const serveCommand = await import('./commands/serve');
      await serveCommand.default();
    });

  // Command: login
  const usageLogin =
    'Log in to your Merchant Center account through the CLI, using the cloud environment information from the Merchant Center customization config file. An API token is generated and stored in a configuration file for the related cloud environment, and valid for 36 hours.';
  cli
    .command('login', usageLogin)
    .usage(`\n\n  ${usageLogin}`)
    .action(async (options: TCliGlobalOptions) => {
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(options);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const loginCommand = await import('./commands/login');
      await loginCommand.default();
    });

  // Command: config:sync
  const usageConfigSync =
    'Synchronizes the local Merchant Center customization config with the Merchant Center. A new Merchant Center customization will be created if none existed, otherwise it will be updated.';
  cli
    .command('config:sync', usageConfigSync)
    .usage(`\n\n  ${usageConfigSync}`)
    .option(
      '--dry-run',
      '(optional) Executes the command but does not send any mutation request.',
      { default: false }
    )
    .action(
      async (options: TCliCommandConfigSyncOptions & TCliGlobalOptions) => {
        // Load dotenv files into the process environment.
        // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
        loadDotEnvFiles(options);

        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        const configSyncCommand = await import('./commands/config-sync');
        await configSyncCommand.default(options);
      }
    );

  // Command: deployment-previews:push
  const usageDeploymentPreviewsPush =
    'Creates or updates a deployment preview for the customization application.';
  cli
    .command('deployment-previews:push', usageDeploymentPreviewsPush)
    .usage(`\n\n  ${usageDeploymentPreviewsPush}`)
    .option(
      '--alias <deployment-preview-alias>',
      "(optional) Alias to be used for the deployment preview. If you don't provide an alias, the script will prompt you for it."
    )
    .option(
      '--url <deployment-preview-url>',
      "(optional) URL to be used for the deployment preview. If you don't provide a URL, the script will prompt you for it."
    )
    .option(
      '--dry-run',
      '(optional) Executes the command but does not send any mutation request.',
      { default: false }
    )
    .action(
      async (
        options: TCliCommandPushDeploymentPreviewOptions & TCliGlobalOptions
      ) => {
        // Load dotenv files into the process environment.
        // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
        loadDotEnvFiles(options);

        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        const deploymentsPushCommand = await import(
          './commands/deployment-previews-push'
        );
        await deploymentsPushCommand.default(options);
      }
    );

  cli.help();
  cli.version(pkgJson.version);

  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
}

// Load dotenv files into the process environment.
// This is essentially what `dotenv-cli` does, but it's now built into this CLI.
// Inspired also by https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used
function loadDotEnvFiles(globalOptions: TCliGlobalOptions) {
  const environment = process.env.MC_APP_ENV || process.env.NODE_ENV;

  const dotenvFiles: string[] = [];

  // Custom dotenv files specified by the `--env` option takes precedence.
  if (typeof globalOptions.env === 'string') {
    dotenvFiles.push(globalOptions.env);
  } else if (Array.isArray(globalOptions.env)) {
    // Multiple `--env` options are allowed.
    dotenvFiles.push(...globalOptions.env);
  }

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  dotenvFiles.push(
    ...([
      `.env.${environment}.local`,
      // Don't include `.env.local` for `test` environment
      // since normally you expect tests to produce the same
      // results for everyone
      process.env.NODE_ENV !== 'test' && `.env.local`,
      `.env.${environment}`,
      '.env',
    ].filter(Boolean) as string[])
  );

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach((dotenvFile) => {
    const dotenvFilePath = path.resolve(
      path.join(applicationDirectory, dotenvFile)
    );
    if (doesFileExist(dotenvFilePath)) {
      dotenvExpand.expand(dotenv.config({ path: dotenvFilePath }));
    }
  });
}

export { run, loadDotEnvFiles };
