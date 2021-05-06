// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const mri = require('mri');
const prompts = require('prompts');
const minimatch = require('minimatch');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { getPackages } = require('@manypkg/get-packages');
const spawn = require('react-dev-utils/crossSpawn');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
Usage: mc-scripts [global-options] [command] [options]

Global options:

  --env <path>              (optional) Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

Commands:

  build                     Bundles the application in production mode. Outputs a "dist" folder.

  compile-html              Compiles "index.html.template" file into a "index.html" with all the required runtime configuration. Outputs a "public" folder. Additionally, the security headers are also compiled and printed to stdout, unless you use a "transformer".
                            More info at https://docs.commercetools.com/custom-applications/deployment/compiling-a-custom-application.
      --transformer <path>  (optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Netlify, Vercel, Firebase).

  start                     Starts the application in development mode using Webpack Dev Server.
      --match <glob>        (optional) A glob pattern (see "minimatch" package on NPM) for matching multiple package names within a mono repository. A prompt will be presented to select the package to execute the command from.

  serve                     Serves previously built and compiled application from the "public" folder.
  `);
  process.exit(0);
}

const command = commands[0];

// Get the current directory where the CLI is executed from. Usually this is the application folder.
const appDirectory = fs.realpathSync(process.cwd());

(async () => {
  try {
    switch (command) {
      case 'build': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.BABEL_ENV = 'production';
        process.env.NODE_ENV = 'production';

        proxyCommand();
        break;
      }
      case 'serve': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        proxyCommand();
        break;
      }
      case 'compile-html': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.NODE_ENV = 'production';

        // Get specific flag for this command.
        const commandArgs = getArgsForCommand(['transformer']);
        proxyCommand({ commandArgs });
        break;
      }
      case 'start': {
        // Do this as the first thing so that any code reading it knows the right env.
        process.env.BABEL_ENV = 'development';
        process.env.NODE_ENV = 'development';

        // Special case to handle the `--match` option, where the user is prompted
        // to select an application. We then use that as the `cwd` value when executing the command.
        const applicationPath = await getApplicationPath(flags);
        proxyCommand({ applicationPath });
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

function proxyCommand({ commandArgs, applicationPath } = {}) {
  // Always use `cwd`, defaults to the application folder.
  // The `applicationPath` is usually used when selecting an application.
  const cwd = applicationPath || appDirectory;

  // Load dotenv files into the process environment.
  // This is essentially what `dotenv-cli` does, but it's now built into this CLI.
  loadDotEnvFiles(flags, cwd);

  // Spawn the actual command.
  const result = spawn.sync(
    'node',
    [require.resolve(`../commands/${command}`)].concat(commandArgs),
    { cwd, stdio: 'inherit' }
  );

  // Handle exit signals.
  if (result.signal) {
    switch (result.signal) {
      case 'SIGKILL': {
        console.log(
          `The command ${command} failed because the process exited too early. This probably means the system ran out of memory or someone called "kill -9" on the process.`
        );
        break;
      }
      case 'SIGTERM': {
        console.log(
          `The command ${command} failed because the process exited too early. Someone might have called "kill" or "killall", or the system could be shutting down.`
        );
        break;
      }
      default:
        break;
    }
    process.exit(1);
  }
  process.exit(result.status);
}

// Determines the application path where to execute the command from.
// If the `--match` flag is provided, the user is prompted to select an
// application matching the given glob pattern.
async function getApplicationPath(flags) {
  if (!flags.match) {
    return appDirectory;
  }

  const { packages } = await getPackages(process.cwd());
  const matchedPackages = packages.filter(({ packageJson }) =>
    minimatch(packageJson.name, flags.match)
  );
  if (matchedPackages.length === 0) {
    throw new Error(`No packages found matching the pattern "${flags.match}".`);
  }
  if (matchedPackages.length === 1) {
    return matchedPackages[0].dir;
  }

  const applicationPrompt = await prompts({
    type: 'select',
    name: 'applicationPath',
    message: 'Select the application where to execute the mc-scripts command.',
    choices: matchedPackages.map(({ packageJson, dir }) => ({
      title: packageJson.name,
      value: dir,
    })),
  });
  if (applicationPrompt.applicationPath) {
    return applicationPrompt.applicationPath;
  }

  throw new Error(`No package selected, aborting.`);
}

// Load dotenv files into the process environment.
// This is essentially what `dotenv-cli` does, but it's now built into this CLI.
// Inspired also by https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used
function loadDotEnvFiles(flags, applicationPath) {
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
    if (fs.existsSync(dotenvFile)) {
      const dotenvFilePath = path.join(applicationPath, dotenvFile);
      dotenvExpand(
        dotenv.config({
          path: path.resolve(dotenvFilePath),
        })
      );
    }
  });
}
