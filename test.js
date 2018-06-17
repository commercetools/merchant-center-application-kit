/* eslint-disable no-console,jest/no-jest-import,prefer-object-spread/prefer-object-spread,import/no-dynamic-require */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const mri = require('mri');
const jest = require('jest');
const createJestConfig = require('./jest-config/create-jest-config');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });

if (flags.help) {
  console.log(`
  Usage: mc-scripts test [options] files..

  NOTE: all given arguments are passed to the jest CLI.

  Options:
  --merge-with-config=<path>     (optional) Merge the given "config" with the default one.
  `);
  process.exit(0);
}

if (flags.config && flags['merge-with-config']) {
  throw new Error(
    'You cannot provide a "--config" and a "--merge-with-config" together.'
  );
}

// Resolve the absolute path of the caller location.
const rootPath = path.resolve('.');
const defaultJestConfig = createJestConfig({
  resolveRelativePath: relativePath => path.resolve(__dirname, relativePath),
  // Resolve the absolute path of the caller location.
  rootDir: rootPath,
});

let finalConfig;
if (flags['merge-with-config']) {
  // eslint-disable-next-line global-require
  const customConfig = require(path.join(rootPath, flags['merge-with-config']));
  finalConfig = Object.assign({}, defaultJestConfig, customConfig);
}

const {
  _, // omit
  'merge-with-config': mergeWithConfig, // omit
  ...remainingFlags // keep the rest of the flags to pass them to jest
} = Object.assign(
  {},
  flags,
  finalConfig
    ? {
        config: JSON.stringify(finalConfig),
      }
    : {}
);
const jestArgs = Object.entries(remainingFlags)
  .map(([key, value]) => `--${key}=${value}`)
  .concat(flags._);
jest.run(jestArgs);
