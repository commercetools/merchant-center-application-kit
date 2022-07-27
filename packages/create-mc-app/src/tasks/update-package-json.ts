import os from 'os';
import fs from 'fs';
import path from 'path';
import { ListrTask } from 'listr2';
import { slugify } from '../utils';
import type { TCliTaskOptions } from '../types';

function updatePackageJson(options: TCliTaskOptions): ListrTask {
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

      const updatedAppPackageJson = Object.assign({}, appPackageJson, {
        version: '1.0.0',
        // Given the package name is derived from the `projectDirectoryName`
        // the latter needs to be sanitised to have a ensure a valid package name.
        // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
        // as a result the package name potentially needs to be altered when derived.
        name: slugify(options.projectDirectoryName),
        description: '',
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
