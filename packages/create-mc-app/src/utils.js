const fs = require('fs');
const path = require('path');
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

const upperFirst = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const wordify = (slug) =>
  slug
    .split('-')
    .map((word) => upperFirst(word))
    .join(' ');

const resolveFilePathByExtension = (requestedModule) => {
  const fileExtension = ['.js', '.ts', '.mjs', '.cjs'].find((fileExtension) => {
    const filePath = path.join(requestedModule, fileExtension);
    return fs.existsSync(filePath);
  });
  return path.join(requestedModule, fileExtension);
};

module.exports = {
  isSemVer,
  shouldUseYarn,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
};
