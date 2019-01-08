const logger = require('../logger');
const { shouldUseYarn } = require('../utils');

module.exports = function success({ projectDirectoryName, templateName }) {
  logger.success(
    `🎉 🎉 🎉 The Merchant Center application ${projectDirectoryName} was successfully bootstrapped based on the ${templateName} template.`
  );
  logger.note();
  logger.note(`To get started:`);
  logger.note(`$ cd ${projectDirectoryName}`);
  logger.note(`$ ${shouldUseYarn ? 'yarn' : 'npm'} start`);
  logger.note();
  logger.note(`For more info, have a look at the README. Enjoy 🚀`);
  // TODO: link to documentation website
};
