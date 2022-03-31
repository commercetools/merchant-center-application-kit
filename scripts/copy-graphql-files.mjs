#!/usr/bin/env node

/**
 * Recursively copy `.graphql` files, preserving the folder structure.
 *
 * Use this after building the package using Babel.
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';

const [from, to] = process.argv.slice(2);

const rootPath = fs.realpathSync(process.cwd());

const fromPath = path.join(rootPath, from);
const toPath = path.join(rootPath, to);

const files = glob.sync(`**/*.graphql`, {
  cwd: fromPath,
  absolute: true,
});

for (const filePath of files) {
  const relativeFilePath = path.relative(fromPath, filePath);
  const toFilePath = path.join(toPath, relativeFilePath);
  fs.mkdirSync(path.dirname(toFilePath), { recursive: true });
  fs.copyFileSync(filePath, toFilePath);
}
