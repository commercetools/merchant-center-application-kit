const semver = require('semver');
const execa = require('execa');

module.exports = function hintOutdatedVersion(currentVersion) {
  try {
    const packageInfoForTagLatest = JSON.parse(
      execa.sync(
        'npm',
        ['view', '@commercetools-frontend/create-mc-app', '--json'],
        {
          encoding: 'utf-8',
          stdio: 'ignore',
        }
      )
    );

    const hasBeenReleastedInLatestTag = semver.gt(
      packageInfoForTagLatest.version,
      currentVersion
    );

    const hintNewerVersions = [
      hasBeenReleastedInLatestTag && `${packageInfoForTagLatest.version}`,
    ]
      .filter(Boolean)
      .join(', ');

    if (hintNewerVersions.length > 0) {
      console.log(`New version available! ${hintNewerVersions}`);
    }
  } catch (error) {
    // Ignore errors, as this function should not affect the exit code of the command
  }
};
