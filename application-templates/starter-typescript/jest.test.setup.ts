// @ts-nocheck
import '@testing-library/jest-dom';
import {
  it,
  jest,
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
} from '@jest/globals';

type TIt = typeof it;
type TJest = typeof jest;
type TAfterAll = typeof afterAll;
type TAfterEach = typeof afterEach;
type TBeforeAll = typeof beforeAll;
type TDescribe = typeof describe;
type TExpect = typeof expect;

declare global {
  var it: TIt;
  var jest: TJest;
  var afterAll: TAfterAll;
  var afterEach: TAfterEach;
  var beforeAll: TBeforeAll;
  var describe: TDescribe;
  var expect: TExpect;
}

global.it = it;
global.jest = jest;
global.afterAll = afterAll;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.describe = describe;
global.expect = expect;
