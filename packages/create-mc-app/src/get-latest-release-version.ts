import execa from 'execa';
import semver from 'semver';

// `npm view <pkg> <field> --json` prints `"x"` up to npm 11, and `["x"]` from
// npm 12 on ("npm view --json now always returns an array").
export function parseLatestReleaseVersion(stdout: string): string | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return undefined;
  }
  const value = Array.isArray(parsed) ? parsed[0] : parsed;
  if (typeof value !== 'string') return undefined;
  return semver.valid(value) ?? undefined;
}

// Only drives the "new version available" hint, so a failed lookup (offline,
// registry error, a future npm output change) gives `undefined`, never a crash.
async function getLatestReleaseVersion(): Promise<string | undefined> {
  try {
    const commandResult = await execa.command(
      'npm view @commercetools-frontend/create-mc-app dist-tags.latest --json',
      { encoding: 'utf-8' }
    );
    return parseLatestReleaseVersion(commandResult.stdout);
  } catch {
    return undefined;
  }
}

export default getLatestReleaseVersion;
