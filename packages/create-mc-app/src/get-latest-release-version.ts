import execa from 'execa';

async function getLatestReleaseVersion() {
  const commandResult = await execa.command(
    'npm view @commercetools-frontend/create-mc-app --json',
    { encoding: 'utf-8' }
  );

  const packageInfoForTagLatest = JSON.parse(commandResult.stdout) as {
    version: string;
  };
  return packageInfoForTagLatest.version;
}

export default getLatestReleaseVersion;
