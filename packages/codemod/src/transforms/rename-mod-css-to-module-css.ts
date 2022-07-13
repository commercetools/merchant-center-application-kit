import fs from 'fs';
import path from 'path';
import type { API, ASTPath, FileInfo, ImportDeclaration } from 'jscodeshift';
import type { TRunnerOptions } from '../types';

function renameModCssToModuleCss(
  file: FileInfo,
  api: API,
  options: TRunnerOptions
) {
  const j = api.jscodeshift;

  let hasModifications = false;

  function renameImportModCssToModuleCss(astPath: ASTPath<ImportDeclaration>) {
    const node = astPath.node;

    if (
      typeof node.source.value === 'string' &&
      node.source.value.endsWith('.mod.css')
    ) {
      if (options.dry) {
        api.stats(file.path);
      } else {
        const previousCssModulesFilePath = node.source.value;
        const nextCssModulesFilePath = previousCssModulesFilePath.replace(
          '.mod.css',
          '.module.css'
        );
        node.source.value = nextCssModulesFilePath;
        hasModifications = true;

        fs.renameSync(
          path.join(path.dirname(file.path), previousCssModulesFilePath),
          path.join(path.dirname(file.path), nextCssModulesFilePath)
        );
      }
    }
  }

  const root = j(file.source);
  root
    .find(j.ImportDeclaration, {
      source: {
        type: 'StringLiteral',
      },
    })
    .forEach(renameImportModCssToModuleCss);

  return hasModifications ? root.toSource(options) : null;
}

export default renameModCssToModuleCss;
