import os from 'os';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import rcfile from 'rcfile';
import prettier from 'prettier';
import { type PluginItem, transformFileSync, types } from '@babel/core';
import { ListrTask } from 'listr2';
import { resolveFilePathByExtension } from '../utils';
import type { TCliTaskOptions } from '../types';

function replaceEntryPointUriPathInConstants(
  filePath: string,
  options: TCliTaskOptions
) {
  const result = transformFileSync(filePath, {
    plugins: [
      function replaceConstants(): PluginItem {
        return {
          visitor: {
            VariableDeclarator(nodePath) {
              if (
                nodePath.node.id.type === 'Identifier' &&
                nodePath.node.id.name === 'entryPointUriPath'
              ) {
                nodePath.node.init = types.stringLiteral(
                  options.entryPointUriPath
                );
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

function updateApplicationConstants(options: TCliTaskOptions): ListrTask {
  return {
    title: 'Updating application constants',
    task: () => {
      const applicationConstantsPath = resolveFilePathByExtension(
        path.join(options.projectDirectoryPath, 'src/constants')
      );
      replaceEntryPointUriPathInConstants(applicationConstantsPath, options);
    },
  };
}

export default updateApplicationConstants;
