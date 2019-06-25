const path = require('path');
const run = require('./run');

describe('jest-stylelint-runner', () => {
  describe('with CSS files', () => {
    it('should pass', () =>
      run({
        testPath: path.join(__dirname, '__fixtures__', 'good.css'),
        config: {},
        globalConfig: {},
      }).then(result => {
        expect(result.numFailingTests).toEqual(0);
        expect(result.numPassingTests).toEqual(1);
      }));
    it('should fail', () =>
      run({
        testPath: path.join(__dirname, '__fixtures__', 'bad.css'),
        config: {},
        globalConfig: {},
      }).then(result => {
        expect(result.numFailingTests).toEqual(1);
        expect(result.numPassingTests).toEqual(0);
      }));
  });
  describe('with JS files', () => {
    it('should pass', () =>
      run({
        testPath: path.join(__dirname, '__fixtures__', 'styled-component.js'),
        config: {},
        globalConfig: {},
      }).then(result => {
        expect(result.numFailingTests).toEqual(0);
        expect(result.numPassingTests).toEqual(1);
      }));
  });
});
