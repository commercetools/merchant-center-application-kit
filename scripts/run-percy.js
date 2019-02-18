/* eslint-disable no-console */

const shelljs = require('shelljs');
const runWhen = require('run-when');

const getChangedFiles = () => {
  const stdout = shelljs.exec(`git diff --name-only origin/master`).stdout;
  return stdout.split('\n').filter(f => f.length);
};

runWhen([
  {
    changedFiles: () => Promise.resolve(getChangedFiles()),
    glob: ['packages/application-components', 'rollup.config.js', 'yarn.lock'],
    task() {
      console.log('Building visual testing app');
      shelljs.exec('yarn visual-testing-app:build');
    },
  },
]);
