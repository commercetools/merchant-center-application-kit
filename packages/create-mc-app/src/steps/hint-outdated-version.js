const semver = require('semver');
const execSync = require('child_process').execSync;
const pkg = require('../../package.json');
const logger = require('../logger');

const currentVersion = pkg.version;

module.exports = function hintOutdatedVersion() {
  try {
    const packageInfoForTagLatest = JSON.parse(
      execSync(`npm view @commercetools-frontend/create-mc-app --json`)
    );
    const packageInfoForTagNext = JSON.parse(
      execSync(`npm view @commercetools-frontend/create-mc-app@next --json`)
    );

    const hasNewerVersionLatest = semver.gt(
      packageInfoForTagLatest.version,
      currentVersion
    );
    const hasNewerVersionNext = semver.gt(
      packageInfoForTagNext.version,
      currentVersion
    );

    const hintNewerVersions = [
      hasNewerVersionLatest && `${packageInfoForTagLatest.version} (stable)`,
      hasNewerVersionNext && `${packageInfoForTagNext.version} (prerelease)`,
    ]
      .filter(Boolean)
      .join(', ');

    if (hintNewerVersions.length > 0) {
      logger.note(`New version available! ${hintNewerVersions}`);
    }
  } catch (error) {
    // Ignore errors, as this function should not affect the exit code of the command
  }
};
