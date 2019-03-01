/* eslint-disable no-console */
const shelljs = require('shelljs');

if (!process.env.CI) {
  throw new Error(`This script is meant to be executed only on CI`);
}

const hasChangesInMatchingFiles = matchingFiles => {
  const isCommitRangeValidResult = shelljs.exec(
    `git diff --name-only "${process.env.TRAVIS_COMMIT_RANGE}"`
  );
  if (isCommitRangeValidResult.code > 0) {
    console.warn(
      `TravisCI has an invalid commit range ("${
        process.env.TRAVIS_COMMIT_RANGE
      }"), probably due to a new PR or a force push (rebase), falling back to single commit...`
    );

    const isMatchingFilesForSingleCommit = shelljs.exec(
      `git diff-tree --no-commit-id --name-only -r "${
        process.env.TRAVIS_COMMIT
      }" | grep --quiet -E "${matchingFiles}"`
    );
    return isMatchingFilesForSingleCommit.code === 0;
  }

  const isMatchingFilesForCommitRange = shelljs.exec(
    `git diff --no-commit-id --name-only -r "${
      process.env.TRAVIS_COMMIT_RANGE
    }" | grep --quiet -E "${matchingFiles}"`
  );
  return isMatchingFilesForCommitRange.code === 0;
};

const shouldSkipPercy = () => {
  const isPullRequest = process.env.TRAVIS_PULL_REQUEST !== 'false';
  const isTargetBranchMaster = process.env.TRAVIS_BRANCH === 'master';

  if (isPullRequest || isTargetBranchMaster) {
    const isIgnoredBranch = [/^renovate\//].some(regex =>
      regex.test(process.env.TRAVIS_PULL_REQUEST_BRANCH)
    );
    return isIgnoredBranch;
  }
  return true;
};

const exitOnError = result => {
  if (result.code > 0) {
    console.error(result.stderr);
    process.exit(1);
  }
};

if (shouldSkipPercy()) {
  console.log('Skipping Percy build');
  process.exit(0);
}

const matchingFiles = ['packages/application-components'].join('|');

console.log('Building visual testing app');
exitOnError(shelljs.exec('yarn visual-testing-app:build'));

if (hasChangesInMatchingFiles(matchingFiles)) {
  exitOnError(shelljs.exec('yarn vrt'));
} else {
  console.warn(
    'No changes were detected in the matching files, falling back to run a dummy snapshot'
  );
  exitOnError(shelljs.exec('yarn vrt:dummy'));
}
