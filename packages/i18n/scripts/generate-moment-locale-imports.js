#!/usr/bin/env node

/**
 * This script generates a file `moment-locales.ts` with the imports for
 * all the matching moment locales based on the main supported languages
 * in the Merchant Center.
 *
 * Usage:
 *
 * node scripts/generate-moment-locale-imports.js
 */

const fs = require('fs');
const path = require('path');
const { generateMomentLocaleImports } = require('../../l10n/moment-utils');

// Path to the generated file.
const momentLocalesImportPath = path.join(
  __dirname,
  '../src/moment-locales.ts'
);

const run = async () => {
  const code = generateMomentLocaleImports();
  fs.writeFileSync(momentLocalesImportPath, code, { encoding: 'utf8' });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
