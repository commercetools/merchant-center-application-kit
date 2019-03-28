/* eslint-disable no-console */
const shelljs = require('shelljs');

if (!process.env.CI) {
  throw new Error(`This script is meant to be executed only on CI`);
}

const COMMIT_RANGE = shelljs.exec(
  `echo ${process.env.CIRCLE_COMPARE_URL} | cut -d/ -f7`
);

const hasChangesInMatchingFiles = matchingFiles => {
  const isCommitRangeValidResult = shelljs.exec(
    `git diff --name-only "${COMMIT_RANGE}"`
  );
  if (isCommitRangeValidResult.code > 0) {
    console.warn(
      `CircleCI has an invalid commit range ("${COMMIT_RANGE}"), probably due to a new PR or a force push (rebase), falling back to single commit...`
    );

    const isMatchingFilesForSingleCommit = shelljs.exec(
      `git diff-tree --no-commit-id --name-only -r "${
        process.env.CIRCLE_SHA1
      }" | grep --quiet -E "${matchingFiles}"`
    );
    return isMatchingFilesForSingleCommit.code === 0;
  }

  const isMatchingFilesForCommitRange = shelljs.exec(
    `git diff --no-commit-id --name-only -r "${COMMIT_RANGE}" | grep --quiet -E "${matchingFiles}"`
  );
  return isMatchingFilesForCommitRange.code === 0;
};

const shouldSkipPercy = () => {
  const isPullRequest = !process.env.CIRCLE_PULL_REQUEST;
  const ignoredBranches = [/^renovate\//];

  if (isPullRequest) {
    const isIgnoredBranch = ignoredBranches.some(regex =>
      regex.test(process.env.CIRCLE_BRANCH)
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

const matchingFiles = [
  'packages/application-components',
  'packages/assets',
  'scripts/run-percy.js',
  'visual-testing-app',
  '.percy.yaml',
  'jest-visual',
  'package.json',
].join('|');

if (hasChangesInMatchingFiles(matchingFiles)) {
  console.log('Building visual testing app');
  exitOnError(shelljs.exec('yarn visual-testing-app:build'));
  exitOnError(shelljs.exec('yarn vrt'));
} else {
  console.warn(
    'No changes were detected in the matching files, skipping Percy run'
  );
  process.exit(0);
}
