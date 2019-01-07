#!/usr/bin/env node

/* eslint-disable no-console */

const steps = require('../src/steps');

try {
  const options = steps.parseArguments();
  steps.downloadTemplate(options);
  steps.updatePackageInfo(options);
  steps.installDependencies(options);
  steps.success(options);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
