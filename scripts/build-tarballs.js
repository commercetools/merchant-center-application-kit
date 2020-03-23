const path = require('path');
const shelljs = require('shelljs');
const PackageUtilities = require('@lerna/project');

const rootPath = path.join(__dirname, '..');
const tarballsDistPath = path.join(rootPath, 'dist-tarballs');

function extractTarball(packageInfo) {
  const appPackageJsonPath = path.join(packageInfo.location, 'package.json');
  const appPackageJson = require(appPackageJsonPath);
  if (appPackageJson.private) return;

  shelljs.exec('npm pack', { cwd: packageInfo.location, silent: true });
  const packageTarName = shelljs
    .ls(packageInfo.location)
    .find((fileName) => fileName.endsWith('.tgz'));
  const tarballPath = path.join(packageInfo.location, packageTarName);
  shelljs.mv(tarballPath, tarballsDistPath);
}

async function run() {
  shelljs.rm('-rf', tarballsDistPath);
  shelljs.mkdir('-p', tarballsDistPath);
  const workspacePackageInfos = await PackageUtilities.getPackages(rootPath);
  workspacePackageInfos.forEach(extractTarball);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
