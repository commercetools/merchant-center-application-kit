/**
 * @jest-environment node
 */
const config = require('./index');

describe('eslint-config-mc-app flat config', () => {
  const baseConfig = config.find(
    (block) =>
      Array.isArray(block.files) &&
      block.files.some((f) => f.includes('{js,jsx,ts,tsx,cjs,mjs}'))
  );

  it('should include typescript resolver in the base config block', () => {
    expect(baseConfig.settings['import/resolver']).toEqual(
      expect.objectContaining({
        typescript: {
          alwaysTryTypes: true,
        },
      })
    );
  });

  it('should still include node resolver in the base config block', () => {
    expect(baseConfig.settings['import/resolver']).toEqual(
      expect.objectContaining({
        node: expect.objectContaining({
          extensions: expect.any(Array),
        }),
      })
    );
  });
});
