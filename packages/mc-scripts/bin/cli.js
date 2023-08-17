#!/usr/bin/env node

// const { run } = require('@commercetools-frontend/mc-scripts/cli');
const { run } = require('../cli/dist/commercetools-frontend-mc-scripts-cli.cjs');

run().catch((error) => {
  console.error(error.message || error.stack || error);
  process.exit(1);
});
