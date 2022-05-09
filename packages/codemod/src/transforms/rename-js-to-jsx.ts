import fs from 'fs';
import type { API, FileInfo } from 'jscodeshift';
import type { TRunnerOptions } from '../types';

function renameJsToJsx(file: FileInfo, api: API, options: TRunnerOptions) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (file.path.endsWith('.js') && !file.path.endsWith('.spec.js')) {
    const hasJSXElements = root.findJSXElements().length > 0;

    if (hasJSXElements) {
      if (options.dry) {
        api.stats(file.path);
      } else {
        const renamedFilePath = file.path.replace('.js', '.jsx');
        fs.renameSync(file.path, renamedFilePath);
        api.report(`renamed to ${renamedFilePath}`);
      }
    }
  }

  return null;
}

export default renameJsToJsx;
