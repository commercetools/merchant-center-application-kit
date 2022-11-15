#!/usr/bin/env node

/**
 * This script should be used for pre/post Gatsby builds to "trick" Vercel to
 * consider the repository a Gatsby website, so that we can leverage incremental builds.
 * Essentially, we are copying/moving the single website cache/public folders from/to
 * the "global" cache/public folders in the repository root folder.
 *
 * Usage:
 *
 * yarn node scripts/gatsby-cache.mjs pre
 * yarn node scripts/gatsby-cache.mjs post
 *
 * This script requires node.js v14.14.0 or higher
 */

import fs from 'fs';
import path from 'path';
import mri from 'mri';
import { getPackages } from '@manypkg/get-packages';
import { findRootSync } from '@manypkg/find-root';

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
  Usage: yarn node ./scripts/gatsby-cache.mjs [command]

  Displays help information.

  Commands:

  pre     Extract each Gatsby website's specific {.cache,public} folders from the root directory to each workspace.
  post    Extract each Gatsby website's specific {.cache,public} folders from each workspace to the root directory.
  `);
  process.exit(0);
}

const [command] = commands;
switch (command) {
  case 'pre':
  case 'post':
    break;
  default:
    throw new Error(
      `Missing or unsupported command "${command}". Supported commands are "pre" or "post".`
    );
}

const workspaceRoot = findRootSync(process.cwd());
const globalPublicPath = path.join(workspaceRoot, 'public');
const globalCachePath = path.join(workspaceRoot, '.cache');
const gatsbyWebsites = ['@commercetools-website/custom-applications'];

const moveFolderFromTo = async (from, to) => {
  await fs.promises.mkdir(from, { recursive: true });
  const fromTargetExists = (await fs.promises.readdir(from)).length > 0;

  if (fromTargetExists) {
    await fs.promises.rm(to, { recursive: true, force: true });
    await fs.promises.rename(from, to);
    const toTargetEntries = (await fs.promises.readdir(to)).length;

    console.log(`Moved folder ${from} to ${to} (${toTargetEntries} entries)`);
  } else {
    console.log(`Folder ${from} does not exist, skipping move.`);
  }
};

const run = async () => {
  const { packages } = await getPackages(process.cwd());

  await fs.promises.mkdir(globalPublicPath, { recursive: true });
  await fs.promises.mkdir(globalCachePath, { recursive: true });

  await Promise.all(
    packages
      .filter((workspace) =>
        gatsbyWebsites.includes(workspace.packageJson.name)
      )
      .map(async (workspace) => {
        const namespaceKey = path.basename(workspace.dir);

        const globalWebsiteCachePath = path.join(globalCachePath, namespaceKey);
        const localWebsiteCachePath = path.join(workspace.dir, '.cache');

        const globalWebsitePublicPath = path.join(
          globalPublicPath,
          namespaceKey
        );
        const localWebsitePublicPath = path.join(workspace.dir, 'public');

        switch (command) {
          case 'pre': {
            // Move global website cache to local cache folder
            await moveFolderFromTo(
              globalWebsiteCachePath,
              localWebsiteCachePath
            );

            // Move global website public to local public folder
            await moveFolderFromTo(
              globalWebsitePublicPath,
              localWebsitePublicPath
            );
            break;
          }
          case 'post': {
            // Move local website cache to global cache folder
            await moveFolderFromTo(
              localWebsiteCachePath,
              globalWebsiteCachePath
            );

            // Move local website public to global public folder
            await moveFolderFromTo(
              localWebsitePublicPath,
              globalWebsitePublicPath
            );
            break;
          }
          default:
            break;
        }
      })
  );
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
