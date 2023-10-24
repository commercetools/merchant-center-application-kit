#!/usr/bin/env node

/**
 * This script should be used for pre/post Gatsby builds to "trick" Vercel to
 * consider the repository a Gatsby website, so that we can leverage incremental builds.
 * Essentially, we are copying/moving the single website cache/public folders from/to
 * the "global" cache/public folders in the repository root folder.
 *
 * Usage:
 *
 * node scripts/gatsby-cache.mjs pre <website>
 * node scripts/gatsby-cache.mjs post <website>
 *
 * This script requires node.js v14.14.0 or higher
 */

import fs from 'fs';
import path from 'path';
import { findRootSync } from '@manypkg/find-root';
import { getPackages } from '@manypkg/get-packages';
import { cac } from 'cac';

const cli = cac('gatsby-cache');

const commands = [
  {
    name: 'pre <website>',
    description:
      "Extract each Gatsby website's specific {.cache,public} folders from the root directory to each workspace.",
    action: async ({
      globalWebsiteCachePath,
      localWebsiteCachePath,
      globalWebsitePublicPath,
      localWebsitePublicPath,
    }) => {
      // Move global website cache to local cache folder
      await moveFolderFromTo(globalWebsiteCachePath, localWebsiteCachePath);

      // Move global website public to local public folder
      await moveFolderFromTo(globalWebsitePublicPath, localWebsitePublicPath);
    },
  },
  {
    name: 'post <website>',
    description:
      "Extract each Gatsby website's specific {.cache,public} folders from each workspace to the root directory.",
    action: async ({
      globalWebsiteCachePath,
      localWebsiteCachePath,
      globalWebsitePublicPath,
      localWebsitePublicPath,
    }) => {
      // Move local website cache to global cache folder
      await moveFolderFromTo(localWebsiteCachePath, globalWebsiteCachePath);

      // Move local website public to global public folder
      await moveFolderFromTo(localWebsitePublicPath, globalWebsitePublicPath);
    },
  },
];

const workspaceRoot = findRootSync(process.cwd());
const globalPublicPath = path.join(workspaceRoot.rootDir, 'public');
const globalCachePath = path.join(workspaceRoot.rootDir, '.cache');

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

  // Default command
  cli
    .command('')
    .usage("\n\n  Manage Gatsby website's specific {.cache,public} folders.")
    .action(cli.outputHelp);

  commands.forEach((command) => {
    cli
      .command(command.name, command.description)
      .usage(`${command.name} \n\n ${command.description}`)
      .action(async ({ website }) => {
        await Promise.all(
          packages
            .filter((workspace) => workspace.packageJson.name === website)
            .map(async (workspace) => {
              const namespaceKey = path.basename(workspace.dir);

              const globalWebsiteCachePath = path.join(
                globalCachePath,
                namespaceKey
              );
              const localWebsiteCachePath = path.join(workspace.dir, '.cache');

              const globalWebsitePublicPath = path.join(
                globalPublicPath,
                namespaceKey
              );
              const localWebsitePublicPath = path.join(workspace.dir, 'public');

              command.action({
                globalWebsiteCachePath,
                localWebsiteCachePath,
                globalWebsitePublicPath,
                localWebsitePublicPath,
              });
            })
        );
      });
  });

  cli.help();

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
