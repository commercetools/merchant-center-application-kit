/* eslint-disable import/first */
jest.autoMockOff();

import fs from 'fs';
import path from 'path';
// @ts-ignore
import { runSnapshotTest } from 'jscodeshift/dist/testUtils';

const fixturesPath = path.join(__dirname, 'fixtures');

const doesFileExist = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
};

describe.each`
  transformName                            | fixtureName
  ${'remove-deprecated-modal-level-props'} | ${'remove-deprecated-modal-level-props.tsx'}
  ${'rename-js-to-jsx'}                    | ${'rename-js-to-jsx.js'}
  ${'rename-mod-css-to-module-css'}        | ${'rename-mod-css-to-module-css.jsx'}
`('testing transform "$transformName"', ({ transformName, fixtureName }) => {
  // Assumes transform is one level up from __tests__ directory
  const module = require(path.join(
    __dirname,
    '../src/transforms',
    transformName
  ));
  const inputPath = path.join(fixturesPath, fixtureName);

  beforeEach(() => {
    switch (transformName) {
      case 'rename-js-to-jsx':
        if (!doesFileExist(inputPath)) {
          fs.writeFileSync(inputPath, '/* Generated */\nexport {};');
        }
        break;
      case 'rename-mod-css-to-module-css':
        const stylesFilePath = path.join(fixturesPath, 'styles.mod.css');
        if (!doesFileExist(stylesFilePath)) {
          fs.writeFileSync(
            stylesFilePath,
            '/* Generated */\nbody { font-size: 1rem; }'
          );
        }
        break;
      default:
        break;
    }
  });

  it('transforms correctly', () => {
    const source = fs.readFileSync(inputPath, 'utf8');

    runSnapshotTest(module, null, {
      source,
      path: inputPath,
    });
  });
});
