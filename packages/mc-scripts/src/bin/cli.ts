import fs from 'fs';
import path from 'path';
import mri from 'mri';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import pkgJson from '../../package.json';
import type { TCliFlags, TCliCommand } from '../types';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Get the current directory where the CLI is executed from. Usually this is the application folder.
const applicationDirectory = fs.realpathSync(process.cwd());

export const run = () => {
  const flags = mri<TCliFlags>(process.argv.slice(2), {
    alias: { help: ['h'] },
    boolean: ['build-only'],
  });
  const commands = flags._;

  if (commands.length === 0 || (flags.help && commands.length === 0)) {
    console.log(`
Usage: mc-scripts [global-options] [command] [options]

https://docs.commercetools.com/custom-applications/api-reference/cli.

Global options:

  --env <path>                (optional) Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

Commands:

  build                       Bundles the application in production mode. Outputs a "public" folder.
    --build-only              (optional) If defined, the command only creates the production bundles without compiling the "index.html".

  compile-html                Compiles "index.html.template" file into a "index.html" with all the required runtime configuration. Additionally, the security headers are also compiled and printed to stdout, unless you use a "transformer".
    --transformer <path>      (optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Vercel, Netlify).
    --print-security-headers  (optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Vercel, Netlify).

  start                       Starts the application in development mode using Webpack Dev Server.

  serve                       Serves previously built and compiled application from the "public" folder.

  login                       Log in to your Merchant Center account through the CLI, using the cloud environment information from the Custom Application config file. An API token is generated and stored in a configuration file for the related cloud environment, and valid for 36 hours.

  config:sync                 Synchronizes the local Custom Application config with the Merchant Center. A new Custom Application will be created if none existed, otherwise it will be updated.
    --dry-run                 (optional) Executes the command but does not send any mutation request.
    `);
    process.exit(0);
  }

  const command = commands[0] as TCliCommand;

  console.log('');
  console.log(`mc-scripts: v${pkgJson.version}`);
  console.log('');

  (async () => {
    try {
      // Load dotenv files into the process environment.
      // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
      loadDotEnvFiles(flags);

      // process.on('SIGKILL', () => {
      //   console.log(
      //     `The command ${command} failed because the process exited too early. This probably means the system ran out of memory or someone called "kill -9" on the process.`
      //   );
      //   process.exit(1);
      // });
      // process.on('SIGTERM', () => {
      //   console.log(
      //     `The command ${command} failed because the process exited too early. Someone might have called "kill" or "killall", or the system could be shutting down.`
      //   );
      //   process.exit(1);
      // });

      switch (command) {
        case 'build': {
          // Do this as the first thing so that any code reading it knows the right env.
          process.env.BABEL_ENV = 'production';
          process.env.NODE_ENV = 'production';

          const shouldAlsoCompile = !flags['build-only'];
          const shouldUseExperimentalBundler =
            process.env.ENABLE_EXPERIMENTAL_VITE_BUNDLER === 'true';
          if (shouldUseExperimentalBundler) {
            console.log('Experimental Vite bundler enabled! 🚀');
            console.warn(
              'NOTE that the "cdnURL" value is not supported at the moment when using Vite.'
            );
            console.log('');
          }

          const buildCommand = shouldUseExperimentalBundler
            ? await import('../commands/build-vite')
            : await import('../commands/build');
          await buildCommand.default();

          if (shouldAlsoCompile) {
            console.log('');
            const compileHtmlCommand = await import('../commands/compile-html');
            await compileHtmlCommand.default(flags);
          }

          break;
        }
        case 'serve': {
          // Do this as the first thing so that any code reading it knows the right env.
          process.env.NODE_ENV = 'production';

          const serveCommand = await import('../commands/serve');
          await serveCommand.default();
          break;
        }
        case 'compile-html': {
          // Do this as the first thing so that any code reading it knows the right env.
          process.env.NODE_ENV = 'production';

          const compileHtmlCommand = await import('../commands/compile-html');
          await compileHtmlCommand.default(flags);

          break;
        }
        case 'start': {
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
            ? await import('../commands/start-vite')
            : await import('../commands/start');
          await startCommand.default();

          break;
        }
        // case 'login': {
        //   // Do this as the first thing so that any code reading it knows the right env.
        //   process.env.NODE_ENV = 'production';

        //   await executeCommand(command);
        //   break;
        // }
        // case 'config:sync': {
        //   // Do this as the first thing so that any code reading it knows the right env.
        //   process.env.NODE_ENV = 'production';

        //   // Get specific flag for this command.
        //   // const commandArgs = getArgsForCommand(flags, ['dry-run']);
        //   await executeCommand(command, {
        //     commandFlags: flags,
        //     // File names with `:` cause issues in Windows, therefore the file name is
        //     // different from the command name.
        //     fileName: 'config-sync',
        //   });
        //   break;
        // }
        default:
          console.log(`Unknown script "${command}".`);
          console.log('Perhaps you need to update mc-scripts?');
          console.log(
            'See: https://www.npmjs.com/package/@commercetools-frontend/mc-scripts'
          );
          break;
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  })();
};

// function getArgsForCommand(
//   flags: TCliFlags,
//   allowedFlags: (keyof TCliFlags)[] = []
// ) {
//   return Object.keys(flags).reduce<string[]>((allArgs, flagKey) => {
//     const cliFlagKey = flagKey as keyof TCliFlags;
//     if (allowedFlags.includes(cliFlagKey)) {
//       const cliFlagValue = flags[cliFlagKey];
//       if (typeof cliFlagValue === 'string') {
//         return allArgs.concat([`--${cliFlagKey}`, cliFlagValue]);
//       }
//       return allArgs.concat([`--${cliFlagKey}`]);
//     }
//     return allArgs;
//   }, []);
// }

// async function executeCommand(
//   commandName: TCliCommand,
//   { commandFlags, fileName, noExit }: TProxyCommandOptions = {}
// ) {
//   process.on('SIGKILL', () => {
//     console.log(
//       `The command ${commandName} failed because the process exited too early. This probably means the system ran out of memory or someone called "kill -9" on the process.`
//     );
//     process.exit(1);
//   });
//   process.on('SIGTERM', () => {
//     console.log(
//       `The command ${commandName} failed because the process exited too early. Someone might have called "kill" or "killall", or the system could be shutting down.`
//     );
//     process.exit(1);
//   });

//   const command = await import(`../commands/${fileName || commandName}`);

//   await command(commandFlags);

//   if (!noExit) {
//     process.exit(0);
//   }
// }

// Load dotenv files into the process environment.
// This is essentially what `dotenv-cli` does, but it's now built into this CLI.
// Inspired also by https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used
function loadDotEnvFiles(flags: TCliFlags) {
  const environment = process.env.MC_APP_ENV || process.env.NODE_ENV;

  const dotenvFiles: string[] = [];

  // Custom dotenv files specified by the `--env` option takes precedence.
  if (typeof flags.env === 'string') {
    dotenvFiles.push(flags.env);
  } else if (Array.isArray(flags.env)) {
    // Multiple `--env` options are allowed.
    dotenvFiles.push(...flags.env);
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
    if (fs.existsSync(dotenvFilePath)) {
      dotenvExpand.expand(dotenv.config({ path: dotenvFilePath }));
    }
  });
}
