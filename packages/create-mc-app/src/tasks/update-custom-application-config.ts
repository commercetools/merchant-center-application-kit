import os from 'os';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import rcfile from 'rcfile';
import prettier from 'prettier';
import { transformFileSync, types, type PluginItem } from '@babel/core';
import { ListrTask } from 'listr2';
import { wordify, resolveFilePathByExtension } from '../utils';
import type { TCliTaskOptions } from '../types';

function replaceApplicationInfoInCustomApplicationConfig(
  filePath: string,
  options: TCliTaskOptions
) {
  const appName = wordify(options.entryPointUriPath);

  const result = transformFileSync(filePath, {
    plugins: [
      function replaceCustomApplicationConfig(): PluginItem {
        return {
          visitor: {
            Identifier(nodePath) {
              if (
                nodePath.isIdentifier({ name: 'name' }) &&
                nodePath.parent.type === 'ObjectProperty'
              ) {
                nodePath.parent.value = types.stringLiteral(appName);
              }
              if (
                nodePath.isIdentifier({ name: 'initialProjectKey' }) &&
                nodePath.parent.type === 'ObjectProperty'
              ) {
                nodePath.parent.value = types.stringLiteral(
                  options.initialProjectKey
                );
              }
              if (nodePath.isIdentifier({ name: 'defaultLabel' })) {
                const isMainMenuLinkParent = nodePath.findParent((parentPath) =>
                  parentPath.isIdentifier({
                    name: 'mainMenuLink',
                  })
                );
                if (
                  isMainMenuLinkParent &&
                  nodePath.parent.type === 'ObjectProperty'
                ) {
                  nodePath.parent.value = types.stringLiteral(appName);
                }
              }
            },
          },
        };
      },
    ],
    retainLines: true,
  });

  if (result?.code) {
    const prettierConfig = rcfile('prettier', {
      cwd: options.projectDirectoryPath,
    });
    const formattedData = prettier.format(result.code + os.EOL, prettierConfig);
    fs.writeFileSync(filePath, formattedData, {
      encoding: 'utf8',
    });
  }
}

function updateCustomApplicationConfig(options: TCliTaskOptions): ListrTask {
  return {
    title: 'Updating Custom Applications config',
    task: () => {
      const customApplicationConfigPath = resolveFilePathByExtension(
        path.join(options.projectDirectoryPath, 'custom-application-config')
      );
      replaceApplicationInfoInCustomApplicationConfig(
        customApplicationConfigPath,
        options
      );
    },
  };
}

export default updateCustomApplicationConfig;
