const path = require('path');
const run = require('./run');

describe('jest-stylelint-runner', () => {
  describe('with CSS files', () => {
    it(
      'should pass',
      () =>
        run({
          testPath: path.join(__dirname, '__fixtures__', 'good.css'),
        }).then((result) => {
          expect(result.numFailingTests).toEqual(0);
          expect(result.numPassingTests).toEqual(1);
        }),
      10000
    );
    it(
      'should fail',
      () =>
        run({
          testPath: path.join(__dirname, '__fixtures__', 'bad.css'),
        }).then((result) => {
          expect(result.numFailingTests).toEqual(1);
          expect(result.numPassingTests).toEqual(0);
        }),
      10000
    );
  });
  describe('with JS files', () => {
    it(
      'should pass',
      () =>
        run({
          testPath: path.join(__dirname, '__fixtures__', 'styled-component.js'),
        }).then((result) => {
          expect(result.numFailingTests).toEqual(0);
          expect(result.numPassingTests).toEqual(1);
        }),
      10000
    );
  });
});
