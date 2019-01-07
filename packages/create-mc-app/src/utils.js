const execSync = require('child_process').execSync;

const isSemVer = version => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const shouldUseYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

const slugify = name => name.toLowerCase().replace(/_/gi, '-');

module.exports = {
  isSemVer,
  shouldUseYarn,
  slugify,
};
