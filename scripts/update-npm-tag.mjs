import shell from 'shelljs';
import { getPackageInfos } from "workspace-tools";

function getPublicPackagesNames() {
  const packages = getPackageInfos(import.meta.resolve('..'));
  return Object.values(packages)
    .filter((pkg) => !pkg.private)
    .map((pkg) => pkg.name);
}

async function getLatestReleaseCandidate(packageName, distTag) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const packageDetails = await response.json();

  const filteredVersions = Object.entries(packageDetails.time)
    .filter(([version]) => version.includes(distTag))
    .sort(([, dateTimeA], [, dateTimeB]) => new Date(dateTimeB).getTime() - new Date(dateTimeA).getTime());

  if (filteredVersions.length === 0) {
    throw new Error(`No release candidate found with dist-tag ${distTag}`);
  }

  return filteredVersions[0][0];
}

async function run() {

  // Get the NPM dist-tag parameter
  const distTag = process.argv[2];

  if (!distTag) {
    throw new Error("Please provide a NPM dist-tag as a parameter");
  }

  // Resolve the public packages of the repository
  const packagesNames = getPublicPackagesNames();

  // Fetch the latest release of the received dist-tag
  const latestVersion = await getLatestReleaseCandidate(packagesNames[0], distTag);

  // Update the dist-tag of all the public packages to the latest release
  for (const packageName of packagesNames) {
    // exec(`npm dist-tag add ${packageName}@${latestVersion} ${distTag}`);
    const result = shell.exec(`sleep 1 && echo "Updating NPM dist: ${packageName}@${latestVersion} ${distTag}"`);
    if (result.code !== 0) {
      throw new Error(`Error updating NPM dist-tag "${distTag}" for ${packageName} with version "${latestVersion}"`);
    }
  }

  process.exit(0);
}

run();
