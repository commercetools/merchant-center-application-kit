#!/usr/bin/env node

/* eslint-disable no-console */

const mri = require('mri');
const spawn = require('react-dev-utils/crossSpawn');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
  Usage: mc-scripts [command] [options]

  Commands:
  build            Bundles the application in production mode
  start            Starts the application using webpack dev server
  extract-intl     Extracts intl messages into JSON files
  `);
  process.exit(0);
}

const command = commands[0];

switch (command) {
  case 'build':
  case 'extract-intl':
  case 'start': {
    const commandArgs = process.argv.slice(2).filter(arg => command !== arg);
    const result = spawn.sync(
      'node',
      [require.resolve(`../${command}`)].concat(commandArgs),
      {
        stdio: 'inherit',
      }
    );
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
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
