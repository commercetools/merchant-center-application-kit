import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import pkgJson from '../package.json';
import type {
  TCliGlobalOptions,
  TCliCommandBuildOptions,
  TCliCommandCompileHtmlOptions,
  TCliCommandConfigSyncOptions,
  TCliCommandSetDeploymentPreviewOptions,
} from './types';
import doesFileExist from './utils/does-file-exist';

program
  .name('mc-scripts')
  .description('CLI to develop and build Merchant Center customizations.')
  .version(pkgJson.version)
  .option(
    '--env <path...>', // Variadic option. It allows multiple `--env` options to be provided.
    `(optional) Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.`
  );

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Get the current directory where the CLI is executed from. Usually this is the application folder.
const applicationDirectory = fs.realpathSync(process.cwd());

async function run() {
  // Command: start
  program
    .command('start')
    .alias('dev')
    .description(
      'Starts the application in development mode using Webpack Dev Server.'
    )
    .action(async () => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

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
  program
    .command('build')
    .description(
      'Bundles the application in production mode. Outputs a "public" folder.'
    )
    .option(
      '--build-only',
      '(optional) If defined, the command only creates the production bundles without compiling the "index.html".',
      false
    )
    .action(async (options: TCliCommandBuildOptions) => {
      const globalOptions = program.opts<TCliGlobalOptions>();
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

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
  program
    .command('compile-html')
    .description(
      'Compiles "index.html.template" file into a "index.html" with all the required runtime configuration. The security headers are also compiled and injected into the "index.html".'
    )
    .option(
      '--transformer <path>',
      '(optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Vercel, Netlify).'
    )
    .option(
      '--print-security-headers',
      '(optional) If defined, the compiled security headers are printed to stdout.',
      false
    )
    .action(async (options: TCliCommandCompileHtmlOptions) => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const compileHtmlCommand = await import('./commands/compile-html');
      await compileHtmlCommand.default(options);
    });

  // Command: serve
  program
    .command('serve')
    .description(
      'Serves previously built and compiled application from the "public" folder.'
    )
    .action(async () => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const serveCommand = await import('./commands/serve');
      await serveCommand.default();
    });

  // Command: login
  program
    .command('login')
    .description(
      'Log in to your Merchant Center account through the CLI, using the cloud environment information from the Merchant Center customization config file. An API token is generated and stored in a configuration file for the related cloud environment, and valid for 36 hours.'
    )
    .action(async () => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const loginCommand = await import('./commands/login');
      await loginCommand.default();
    });

  // Command: config:sync
  program
    .command('config:sync')
    .description(
      'Synchronizes the local Merchant Center customization config with the Merchant Center. A new Merchant Center customization will be created if none existed, otherwise it will be updated.'
    )
    .option(
      '--dry-run',
      '(optional) Executes the command but does not send any mutation request.',
      false
    )
    .action(async (options: TCliCommandConfigSyncOptions) => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const configSyncCommand = await import('./commands/config-sync');
      await configSyncCommand.default(options);
    });

  // Command: deployment-previews:set
  program
    .command('deployment-previews:set')
    .description(
      'Creates or updates a deployment preview for the Custom Application.'
    )
    .option(
      '--alias <deployment-preview-alias>',
      "(optional) Alias to be used for the deployment preview. If you don't provide an alias, the command will prompt you for it."
    )
    .option(
      '--url <deployment-preview-url>',
      "(optional) URL to be used for the deployment preview. If you don't provide a URL, the command will prompt you for it."
    )
    .option(
      '--dry-run',
      '(optional) Executes the command but does not send any mutation request.',
      false
    )
    .action(async (options: TCliCommandSetDeploymentPreviewOptions) => {
      const globalOptions = program.opts<TCliGlobalOptions>();

      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(globalOptions);

      // Do this as the first thing so that any code reading it knows the right env.
      process.env.NODE_ENV = 'production';

      const deploymentsSetCommand = await import(
        './commands/deployment-previews-set'
      );
      await deploymentsSetCommand.default(options);
    });

  program.parse();
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
