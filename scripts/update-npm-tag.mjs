import { getPackages } from '@manypkg/get-packages';
import shell from 'shelljs';

async function getPublicPackagesNames() {
  const { packages } = await getPackages(process.cwd());
  return packages
    .filter((pkg) => !pkg.packageJson.private)
    .map((pkg) => pkg.packageJson.name);
}

async function getLatestReleaseCandidate(packageName, distTag) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const packageDetails = await response.json();

  const filteredVersions = Object.entries(packageDetails.time)
    .filter(([version]) => version.includes(distTag))
    .sort(
      ([, dateTimeA], [, dateTimeB]) =>
        new Date(dateTimeB).getTime() - new Date(dateTimeA).getTime()
    );

  if (filteredVersions.length === 0) {
    throw new Error(`No release candidate found with dist-tag ${distTag}`);
  }

  return filteredVersions[0][0];
}

// Get the NPM dist-tag parameter
const [, , distTag] = process.argv;

if (!distTag) {
  throw new Error('Please provide a NPM dist-tag as a parameter');
}

// Resolve the public packages of the repository
const packagesNames = await getPublicPackagesNames();

// Update the dist-tag of all the public packages to the latest release
for (const packageName of packagesNames) {
  // Fetch the latest release of the received dist-tag for this package
  const latestVersion = await getLatestReleaseCandidate(packageName, distTag);

  // Update the dist-tag of all the public packages to the latest release
  const result = shell.exec(
    `npm dist-tag add ${packageName}@${latestVersion} ${distTag}`
  );
  if (result.code !== 0) {
    throw new Error(
      `Error updating NPM dist-tag "${distTag}" for ${packageName} with version "${latestVersion}"`
    );
  }
}
