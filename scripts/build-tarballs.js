const { getPackages } = require('@manypkg/get-packages');
const path = require('path');
const shelljs = require('shelljs');

const rootPath = path.join(__dirname, '..');
const tarballsDistPath = path.join(rootPath, 'dist-tarballs');

function extractTarball(packageInfo) {
  if (packageInfo.packageJson.private) return;

  shelljs.exec('npm pack', { cwd: packageInfo.dir, silent: true });

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
