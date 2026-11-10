import semver from 'semver';

function hintOutdatedVersion(
  currentVersion: string,
  releaseVersion: string | undefined
) {
  // The hint is informational: when npm gives no usable version, skip it.
  if (!releaseVersion) return;

  const hasBeenReleastedInLatestTag = semver.gt(releaseVersion, currentVersion);

  const hintNewerVersions = [hasBeenReleastedInLatestTag && `${releaseVersion}`]
    .filter(Boolean)
    .join(', ');

  if (hintNewerVersions.length > 0) {
    console.log('');
    console.log(
      `New version available! ${currentVersion} -> ${hintNewerVersions}`
    );
    console.log('');
  }
}

export default hintOutdatedVersion;
