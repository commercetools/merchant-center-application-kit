const path = require('path');
const shelljs = require('shelljs');
const { getPackages } = require('@manypkg/get-packages');

shelljs.set('-e');

const rootPath = path.join(__dirname, '..');
const tarballsDistPath = path.join(rootPath, 'dist-tarballs');

function extractTarball(packageInfo) {
  if (packageInfo.packageJson.private) return;

  shelljs.exec('yarn pack', { cwd: packageInfo.dir, silent: true });

  const packageTarName = shelljs
    .ls(packageInfo.dir)
    .find((fileName) => fileName.endsWith('.tgz'));
  const tarballPath = path.join(packageInfo.dir, packageTarName);

  shelljs.mv(tarballPath, tarballsDistPath);
}

async function run() {
  shelljs.rm('-rf', tarballsDistPath);
  shelljs.mkdir('-p', tarballsDistPath);

  const { packages } = await getPackages(rootPath);
  packages.forEach(extractTarball);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
