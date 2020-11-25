const { shouldUseYarn } = require('./utils');
const tasks = require('./tasks');
const hintOutdatedVersion = require('./hint-outdated-version');
const parseArguments = require('./parse-arguments');

module.exports = {
  shouldUseYarn,
  tasks,
  hintOutdatedVersion,
  parseArguments,
};
