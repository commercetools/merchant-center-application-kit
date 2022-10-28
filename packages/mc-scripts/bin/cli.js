#!/usr/bin/env node

const { run } = require('@commercetools-frontend/mc-scripts/cli');

run().catch((error) => {
  console.error(error.message || error.stack || error);
  process.exit(1);
});
