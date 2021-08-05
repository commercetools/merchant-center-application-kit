const execa = require('execa');

const isSemVer = (version) => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const shouldUseYarn = () => {
  try {
    const result = execa.sync('yarn', ['--version'], { stdio: 'ignore' });
    return !result.failed;
  } catch (error) {
    return false;
  }
};

const slugify = (name) => name.toLowerCase().replace(/_/gi, '-');

const upperFirst = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const wordify = (slug) =>
  slug
    .split('-')
    .map((word) => upperFirst(word))
    .join(' ');

module.exports = {
  isSemVer,
  shouldUseYarn,
  slugify,
  wordify,
  upperFirst,
};
