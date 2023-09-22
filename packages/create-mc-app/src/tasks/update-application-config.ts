import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { transformFileSync, types, type PluginItem } from '@babel/core';
import type { ListrTask } from 'listr2';
import prettier from 'prettier';
import { applicationTypes } from '../constants';
import type { TCliTaskOptions } from '../types';
import { wordify, resolveFilePathByExtension } from '../utils';

function replaceApplicationInfoInApplicationConfig(
  filePath: string,
  options: TCliTaskOptions
) {
  const result = transformFileSync(filePath, {
    plugins: [
      function replaceConfig(): PluginItem {
        const appName = wordify(
          options.entryPointUriPath ?? options.projectDirectoryName
        );
        return {
          visitor: {
            Identifier(nodePath) {
              if (
                options.applicationType ===
                  applicationTypes['custom-application'] &&
                nodePath.isIdentifier({ name: 'name' }) &&
                nodePath.parent.type === 'ObjectProperty'
              ) {
                nodePath.parent.value = types.stringLiteral(appName);
              }
              if (
                options.applicationType === applicationTypes['custom-view'] &&
                nodePath.isIdentifier({ name: 'defaultLabel' }) &&
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
              if (
                options.applicationType ===
                  applicationTypes['custom-application'] &&
                nodePath.isIdentifier({ name: 'defaultLabel' })
              ) {
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
    const prettierConfig = prettier.resolveConfig.sync(
      options.projectDirectoryPath
    );
    const formattedData = prettier.format(
      result.code + os.EOL,
      prettierConfig ?? undefined
    );
    fs.writeFileSync(filePath, formattedData, {
      encoding: 'utf8',
    });
  }
}

function getApplicationConfigName(options: TCliTaskOptions) {
  switch (options.applicationType) {
    case applicationTypes['custom-application']:
      return 'custom-application-config';
    case applicationTypes['custom-view']:
      return 'custom-view-config';
    default:
      throw new Error(`Unknown application type ${options.applicationType}`);
  }
}

function updateApplicationConfig(options: TCliTaskOptions): ListrTask {
  return {
    title: 'Updating application config file',
    task: () => {
      const configPath = resolveFilePathByExtension(
        path.join(
          options.projectDirectoryPath,
          getApplicationConfigName(options)
        )
      );
      replaceApplicationInfoInApplicationConfig(configPath, options);
    },
  };
}

export default updateApplicationConfig;
