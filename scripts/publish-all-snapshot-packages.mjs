import { getPackages } from '@manypkg/get-packages';
import shell from 'shelljs';

const [, , distTag] = process.argv;

if (!distTag) {
  throw new Error('Please provide a NPM dist-tag as a parameter');
}

const { packages } = await getPackages(process.cwd());
const publicPackages = packages.filter((pkg) => !pkg.packageJson.private);

for (const pkg of publicPackages) {
  const { name, version } = pkg.packageJson;

  // Skip packages that don't have the snapshot version
  if (!version.includes(distTag)) {
    continue;
  }

  // Check if this version already exists on npm
  const check = shell.exec(`npm view ${name}@${version} version 2>/dev/null`, {
    silent: true,
  });

  if (check.stdout.trim() === version) {
    console.log(`✓ ${name}@${version} already published`);
    continue;
  }

  // Publish the package
  console.log(`Publishing ${name}@${version}...`);
  const result = shell.exec(`npm publish --tag ${distTag}`, {
    cwd: pkg.dir,
    silent: false,
  });

  if (result.code !== 0) {
    console.error(`✗ Failed to publish ${name}@${version}`);
  } else {
    console.log(`✓ Published ${name}@${version}`);
  }
}
