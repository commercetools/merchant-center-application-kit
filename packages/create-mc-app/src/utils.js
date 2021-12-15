const fs = require('fs');
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

const resolveFilePathByExtension = (requestedModule) => {
  const fileExtension = ['.js', '.ts', '.mjs', '.cjs'].find((ext) => {
    const filePath = `${requestedModule}${ext}`;
    return fs.existsSync(filePath);
  });
  return `${requestedModule}${fileExtension}`;
};

module.exports = {
  isSemVer,
  shouldUseYarn,
  slugify,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
};
