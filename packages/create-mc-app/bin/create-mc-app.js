#!/usr/bin/env node

const steps = require('../src/steps');
const logger = require('../src/logger');
const pkg = require('../package.json');

logger.log(`create-mc-app v${pkg.version}`);

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
