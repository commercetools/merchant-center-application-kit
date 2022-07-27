import fs from 'fs';
import execa from 'execa';

const isSemVer = (version: string) => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const shouldUseYarn = () => {
  try {
    const result = execa.commandSync('yarn --version', { stdio: 'ignore' });
    return !result.failed;
  } catch (error) {
    return false;
  }
};

const slugify = (name: string) => name.toLowerCase().replace(/_/gi, '-');

const upperFirst = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const wordify = (slug: string) =>
  slug
    .split('-')
    .map((word) => upperFirst(word))
    .join(' ');

const resolveFilePathByExtension = (requestedModule: string) => {
  const fileExtension = ['.js', '.ts', '.mjs', '.cjs'].find((ext) => {
    const filePath = `${requestedModule}${ext}`;
    return fs.existsSync(filePath);
  });
  return `${requestedModule}${fileExtension}`;
};

export {
  isSemVer,
  shouldUseYarn,
  slugify,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
};
