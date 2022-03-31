// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const mri = require('mri');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const spawn = require('react-dev-utils/crossSpawn');
const pkg = require('../../package.json');

const flags = mri(process.argv.slice(2), {
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

const command = commands[0];

console.log('');
console.log(`mc-scripts: v${pkg.version}`);
console.log('');

// Get the current directory where the CLI is executed from. Usually this is the application folder.
const applicationDirectory = fs.realpathSync(process.cwd());

(async () => {
  try {
    switch (command) {
      case 'build': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.BABEL_ENV = 'production';
        process.env.NODE_ENV = 'production';

        const shouldAlsoCompile = !flags['build-only'];

        proxyCommand(command, {
          noExit: shouldAlsoCompile,
        });

        if (shouldAlsoCompile) {
          proxyCommand('compile-html');
        }

        break;
      }
      case 'serve': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        proxyCommand(command);
        break;
      }
      case 'compile-html': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        // Get specific flag for this command.
        const commandArgs = getArgsForCommand([
          'transformer',
          'print-security-headers',
        ]);
        proxyCommand(command, { commandArgs });
        break;
      }
      case 'start': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.BABEL_ENV = 'development';
        process.env.NODE_ENV = 'development';

        proxyCommand(command);
        break;
      }
      case 'login': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        proxyCommand(command);
        break;
      }
      case 'config:sync': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        // Get specific flag for this command.
        const commandArgs = getArgsForCommand(['dry-run']);
        proxyCommand(command, { commandArgs });
        break;
      }
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
})();

function getArgsForCommand(allowedFlags = []) {
  return Object.keys(flags).reduce((allArgs, flagKey) => {
    if (allowedFlags.includes(flagKey)) {
      return allArgs.concat([`--${flagKey}`, flags[flagKey]]);
    }
    return allArgs;
  }, []);
}

function proxyCommand(fileName, { commandArgs, noExit } = {}) {
  // Load dotenv files into the process environment.
  // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
  loadDotEnvFiles(flags);

  // Spawn the actual command.
  const result = spawn.sync(
    'node',
    [require.resolve(`../commands/${fileName}`)].concat(commandArgs),
    { stdio: 'inherit' }
  );

  // Handle exit signals.
  if (result.signal) {
    switch (result.signal) {
      case 'SIGKILL': {
        console.log(
          `The command ${fileName} failed because the process exited too early. This probably means the system ran out of memory or someone called "kill -9" on the process.`
        );
        break;
      }
      case 'SIGTERM': {
        console.log(
          `The command ${fileName} failed because the process exited too early. Someone might have called "kill" or "killall", or the system could be shutting down.`
        );
        break;
      }
      default:
        break;
    }
    process.exit(1);
  }
  if (result.status > 0) {
    process.exit(result.status);
  } else {
    if (!noExit) {
      process.exit(result.status);
    }
  }
}

// Load dotenv files into the process environment.
// This is essentially what `dotenv-cli` does, but it's now built into this CLI.
// Inspired also by https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used
function loadDotEnvFiles(flags) {
  const environment = process.env.MC_APP_ENV || process.env.NODE_ENV;

  const dotenvFiles = [];

  // Custom dotenv files specified by the `--env` option takes precedence.
  if (typeof flags.env === 'string') {
    dotenvFiles.push(flags.env);
  } else if (Array.isArray(flags.env)) {
    // Multiple `--env` options are allowed.
    dotenvFiles.push(...flags.env);
  }

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  dotenvFiles.push(
    ...[
      `.env.${environment}.local`,
      // Don't include `.env.local` for `test` environment
      // since normally you expect tests to produce the same
      // results for everyone
      process.NODE_ENV !== 'test' && `.env.local`,
      `.env.${environment}`,
      '.env',
    ].filter(Boolean)
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
