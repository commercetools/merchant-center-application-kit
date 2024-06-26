import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { ListrTask } from 'listr2';
import type { TCliTaskOptions } from '../types';
import { getPreferredPackageManager, slugify } from '../utils';

const replaceApplicationKitPackageVersionWith = (
  releaseVersion: string,
  dependencies: Record<string, string> = {}
) =>
  Object.entries(dependencies).reduce(
    (updatedDependencies, [dependencyName, dependencyVersion]) => {
      const updatedVersion =
        dependencyVersion === 'workspace:*'
          ? releaseVersion
          : dependencyVersion;
      return {
        ...updatedDependencies,
        [dependencyName]: updatedVersion,
      };
    },
    {}
  );

function updatePackageJson(
  options: TCliTaskOptions,
  releaseVersion: string
): ListrTask {
  return {
    title: 'Updating package.json',
    task: () => {
      const packageJsonPath = path.join(
        options.projectDirectoryPath,
        'package.json'
      );
      const appPackageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, { encoding: 'utf8' })
      );
      const packageManager = getPreferredPackageManager(options);

      const updatedAppPackageJson = Object.assign({}, appPackageJson, {
        version: '1.0.0',
        // Given the package name is derived from the `projectDirectoryName`
        // the latter needs to be sanitised to have a ensure a valid package name.
        // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
        // as a result the package name potentially needs to be altered when derived.
        name: slugify(options.projectDirectoryName),
        description: '',
        // Replace the package versions with the `workspace:` syntax to the real version.
        dependencies: replaceApplicationKitPackageVersionWith(
          releaseVersion,
          appPackageJson.dependencies
        ),
        devDependencies: replaceApplicationKitPackageVersionWith(
          releaseVersion,
          appPackageJson.devDependencies
        ),
        scripts: {
          ...appPackageJson.scripts,
          'start:prod:local': appPackageJson.scripts[
            'start:prod:local'
          ].replace('yarn', packageManager),
        },
      });

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
        { encoding: 'utf8' }
      );
    },
  };
}

export default updatePackageJson;
