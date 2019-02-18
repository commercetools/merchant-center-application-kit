/* eslint-disable no-console */

const shelljs = require('shelljs');
const runWhen = require('run-when');

const getChangedFiles = () => {
  // TODO: Remove "origin"?
  const stdout = shelljs.exec(
    `git diff --name-only ${process.env.TRAVIS_COMMIT_RANGE}`
  ).stdout;
  const files = stdout.split('\n').filter(f => f.length);

  return files;
};

const changedFiles = getChangedFiles();

runWhen([
  {
    changedFiles: () => Promise.resolve(changedFiles),
    glob: ['packages/application-components', 'rollup.config.js', 'yarn.lock'],
    task() {
      console.log('Building visual testing app');
      shelljs.exec('yarn visual-testing-app:build');
      shelljs.exec('yarn percy --reporters jest-silent-reporter');
    },
  },
]);
