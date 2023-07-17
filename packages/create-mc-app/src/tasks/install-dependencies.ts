import execa from 'execa';
import type { ListrTask } from 'listr2';
import type { TCliTaskOptions } from '../types';
import { getInstallCommand } from '../utils';

function installDependencies(options: TCliTaskOptions): ListrTask {
  return {
    title: 'Installing dependencies (this might take a while)',
    task: () => {
      const installCommand = getInstallCommand(options);

      // TODO: we could check for min yarn/npm versions
      // See https://github.com/facebook/create-react-app/blob/0f4781e8507249ce29a9ac1409fece67c1a53c38/packages/create-react-app/createReactApp.js#L225-L254
      return execa.command(installCommand, {
        cwd: options.projectDirectoryPath,
        encoding: 'utf-8',
      });
    },
  };
}

export default installDependencies;
