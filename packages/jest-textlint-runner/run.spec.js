const path = require('path');
const run = require('./run');

describe('jest-textlint-runner', () => {
  it('should pass', () =>
    run({
      testPath: path.join(__dirname, '__fixtures__', 'good.mdx'),
      config: {},
      globalConfig: {},
    }).then(result => {
      expect(result.numFailingTests).toEqual(0);
      expect(result.numPassingTests).toEqual(1);
    }));
  it('should fail', () =>
    run({
      testPath: path.join(__dirname, '__fixtures__', 'bad.mdx'),
      config: {},
      globalConfig: {},
    }).then(result => {
      expect(result.numFailingTests).toEqual(1);
      expect(result.numPassingTests).toEqual(0);
    }));
});
