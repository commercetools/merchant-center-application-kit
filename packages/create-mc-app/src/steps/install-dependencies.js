const execSync = require('child_process').execSync;
const logger = require('../logger');
const { shouldUseYarn } = require('../utils');

module.exports = function installDependencies({ projectDirectoryPath }) {
  logger.info(`🤖 Installing dependencies...`);

  const useYarn = shouldUseYarn();
  const packageManager = useYarn ? 'yarn' : 'npm';
  // TODO: we could check for min yarn/npm versions
  // See https://github.com/facebook/create-react-app/blob/0f4781e8507249ce29a9ac1409fece67c1a53c38/packages/create-react-app/createReactApp.js#L225-L254
  try {
    execSync(`${packageManager} install`, {
      cwd: projectDirectoryPath,
      stdio: 'inherit',
    });
  } catch (error) {
    throw new Error(
      `Error while installing dependencies in "${projectDirectoryPath}":\n`,
      error
    );
  }
};
