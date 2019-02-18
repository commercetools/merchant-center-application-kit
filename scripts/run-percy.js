/* eslint-disable no-console */

const multimatch = require('multimatch');
const shelljs = require('shelljs');

const getChangedFiles = range => {
  // TODO: Remove "origin"?
  const stdout = shelljs.exec(`git diff --name-only ${range}`).stdout;
  const files = stdout.split('\n').filter(f => f.length);

  return files;
};

const range = process.env.TRAVIS_COMMIT_RANGE || 'origin/master';

const changedFiles = getChangedFiles(range);

const rulesGlob = [
  'packages/application-components/**',
  'rollup.config.js',
  'yarn.lock',
];

const diff = multimatch(changedFiles, rulesGlob);
console.log('diff', diff);
if (diff.length > 0) {
  console.log('Building visual testing app');
  shelljs.exec('yarn visual-testing-app:build');
  shelljs.exec('yarn percy --reporters jest-silent-reporter');
} else {
  console.log('No files changed, skipping visual tests');
}
