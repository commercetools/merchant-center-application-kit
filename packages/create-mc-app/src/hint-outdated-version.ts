import semver from 'semver';
import execa from 'execa';

function hintOutdatedVersion(currentVersion: string) {
  try {
    const commandResult = execa.commandSync(
      'npm view @commercetools-frontend/create-mc-app --json',
      {
        encoding: 'utf-8',
        stdio: 'ignore',
      }
    );

    const packageInfoForTagLatest = JSON.parse(commandResult.stdout);

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
}

export default hintOutdatedVersion;
