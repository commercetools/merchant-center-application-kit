/* eslint-disable no-console */

const shelljs = require('shelljs');
const runWhen = require('run-when');

runWhen([
  {
    glob: ['packages/application-components', 'rollup.config.js', 'yarn.lock'],
    task() {
      console.log('Building visual testing app');
      shelljs.exec('yarn visual-testing-app:build');
      shelljs.exec('yarn percy --reporters jest-silent-reporter');
    },
  },
]);
