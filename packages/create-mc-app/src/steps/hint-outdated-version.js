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

    const hasBeenReleastedInLatestTag = semver.gt(
      packageInfoForTagLatest.version,
      currentVersion
    );
    const hasBeenReleasedInNextTag = semver.gt(
      packageInfoForTagNext.version,
      currentVersion
    );

    const hintNewerVersions = [
      hasBeenReleastedInLatestTag &&
        `${packageInfoForTagLatest.version} (stable)`,
      hasBeenReleasedInNextTag &&
        `${packageInfoForTagNext.version} (prerelease)`,
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
