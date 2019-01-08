#!/usr/bin/env node

const steps = require('../src/steps');
const logger = require('../src/logger');

try {
  const options = steps.parseArguments();
  steps.downloadTemplate(options);
  steps.updatePackageInfo(options);
  steps.installDependencies(options);
  steps.success(options);
  process.exit(0);
} catch (error) {
  logger.error(error);
  process.exit(1);
}
