import semver from 'semver';
import execa from 'execa';

async function hintOutdatedVersion(currentVersion: string) {
  try {
    const commandResult = await execa.command(
      'npm view @commercetools-frontend/create-mc-app --json',
      { encoding: 'utf-8' }
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
      console.log('');
      console.log(
        `New version available! ${currentVersion} -> ${hintNewerVersions}`
      );
      console.log('');
    }
  } catch (error) {
    // Ignore errors, as this function should not affect the exit code of the command
    if (process.env.NODE_ENV === 'test') {
      console.error(error);
    }
  }
}

export default hintOutdatedVersion;
