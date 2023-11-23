import fs from 'node:fs';
import execa from 'execa';
import type {
  TApplicationType,
  TCliTaskOptions,
  TPackageManager,
} from './types';

const isSemVer = (version: string) => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const shouldUseYarn = () => {
  try {
    const result = execa.commandSync('yarn --version', { stdio: 'ignore' });
    return !result.failed;
  } catch (error) {
    return false;
  }
};

const getPreferredPackageManager = (
  options: TCliTaskOptions
): TPackageManager => {
  if (options.packageManager) {
    return options.packageManager;
  }
  // Attempt to use yarn (backwards compatibility)
  if (shouldUseYarn()) {
    return 'yarn';
  }
  // Fall back to npm
  return 'npm';
};

const getInstallCommand = (options: TCliTaskOptions): string => {
  const packageManager = getPreferredPackageManager(options);

  switch (packageManager) {
    case 'npm':
      return 'npm install --legacy-peer-deps';
    default:
      return `${packageManager} install`;
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

const isCustomView = (applicationType: TApplicationType) =>
  applicationType === 'custom-view';

export {
  isSemVer,
  shouldUseYarn,
  slugify,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
  getPreferredPackageManager,
  getInstallCommand,
  isCustomView,
};
