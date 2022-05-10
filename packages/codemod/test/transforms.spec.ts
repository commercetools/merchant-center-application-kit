/* eslint-disable import/first */
jest.autoMockOff();

import fs from 'fs';
import path from 'path';
// @ts-ignore
import { defineSnapshotTest } from 'jscodeshift/dist/testUtils';

const fixturesPath = path.join(__dirname, 'fixtures');

describe.each`
  transformName                            | fixtureName
  ${'remove-deprecated-modal-level-props'} | ${'remove-deprecated-modal-level-props.tsx'}
`('testing transform "$transformName"', ({ transformName, fixtureName }) => {
  // Assumes transform is one level up from __tests__ directory
  const module = require(path.join(
    __dirname,
    '../src/transforms',
    transformName
  ));
  const inputPath = path.join(fixturesPath, fixtureName);
  const source = fs.readFileSync(inputPath, 'utf8');
  defineSnapshotTest(module, null, source);
});
