const execa = require('execa');

const isSemVer = version => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const shouldUseYarn = () => {
  const result = execa.sync('yarnpkg', ['--version'], { stdio: 'ignore' });
  return !result.failed;
};

const slugify = name => name.toLowerCase().replace(/_/gi, '-');

module.exports = {
  isSemVer,
  shouldUseYarn,
  slugify,
};
