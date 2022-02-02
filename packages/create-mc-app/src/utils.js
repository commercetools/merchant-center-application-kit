const fs = require('fs');
const execa = require('execa');
const semver = require('semver');

const isValidNodeVersion = (currentNodeVersion, expectedVersionRange) => {
  const hasValidNodeVersion = semver.satisfies(
    currentNodeVersion,
    expectedVersionRange
  );

  if (!hasValidNodeVersion) {
    console.error(
      `You are running Node ${currentNodeVersion} but create-mc-app requires Node ${expectedVersionRange}. Please update your version of Node.`
    );
    process.exit(1);
  }
};

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
  isValidNodeVersion,
  isSemVer,
  shouldUseYarn,
  slugify,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
};
