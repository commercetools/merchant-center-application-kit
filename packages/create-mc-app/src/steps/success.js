/* eslint-disable no-console */
const { shouldUseYarn } = require('../utils');

module.exports = function success({ projectDirectoryName, templateName }) {
  console.log();
  console.log(`Success! 🎉`);
  console.log(
    `The Merchant Center application ${projectDirectoryName} was successfully bootstrapped based on the ${templateName} template.`
  );
  console.log();
  console.log(`To get started:`);
  console.log(`  $ cd ${projectDirectoryName}`);
  console.log(`  $ ${shouldUseYarn ? 'yarn' : 'npm'} start`);
  console.log();
  console.log(`For more info, have a look at the README. Enjoy 🚀`);
  // TODO: link to documentation website
};
