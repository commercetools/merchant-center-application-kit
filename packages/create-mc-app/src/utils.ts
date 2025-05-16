import fs from 'node:fs';
import path from 'node:path';
import execa from 'execa';
import type {
  TApplicationType,
  TCliTaskOptions,
  TPackageManager,
} from './types';

const isSemVer = (version: string) => /^(v?)([0-9].[0-9].[0-9])+/.test(version);

const doesFileExist = (path: string): boolean => {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
};

const shouldUseYarn = () => {
  try {
    const result = execa.commandSync('yarn --version', { stdio: 'ignore' });
    return !result.failed;
  } catch (error) {
    return false;
  }
};

const getYarnVersion = () => {
  try {
    const result = execa.commandSync('yarn --version', { encoding: 'utf-8' });
    return result.stdout.trim();
  } catch (error) {
    return null;
  }
};

const configureYarn = (projectDirectoryPath: string) => {
  const yarnVersion = getYarnVersion();
  if (!yarnVersion) return;

  // Check if Yarn version is 2 or higher. Plug'n'Play was introduced in Yarn v2
  const majorVersion = parseInt(yarnVersion.split('.')[0], 10);
  if (majorVersion >= 2) {
    // Sanitize and resolve the path
    const normalizedProjectPath = path.resolve(projectDirectoryPath);

    // Create .yarnrc.yml to use node_modules
    const yarnrcPath = path.join(normalizedProjectPath, '.yarnrc.yml');
    const yarnrcContent = 'nodeLinker: "node-modules"\n';

    fs.writeFileSync(yarnrcPath, yarnrcContent);
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
    return doesFileExist(filePath);
  });
  return `${requestedModule}${fileExtension}`;
};

const isCustomView = (applicationType: TApplicationType) =>
  applicationType === 'custom-view';

export {
  isSemVer,
  shouldUseYarn,
  getYarnVersion,
  configureYarn,
  slugify,
  wordify,
  upperFirst,
  resolveFilePathByExtension,
  getPreferredPackageManager,
  getInstallCommand,
  isCustomView,
  doesFileExist,
};
