import { transformSync } from '@babel/core';
import getBabePresetConfigForMcAppForProduction from './production';

describe('babel-plugin-formatjs', () => {
  const code = `
    import { defineMessages } from 'react-intl';

    const messages = defineMessages({
      welcome: {
        id: 'app.welcome',
        defaultMessage: 'Welcome, {name}!',
        description: 'Message to greet the user by name',
      },
    });
  `;

  beforeEach(() => {
    process.env.ENABLE_BABEL_PLUGIN_FORMATJS = 'true';
  });

  it('should remove description by default', () => {
    const config = getBabePresetConfigForMcAppForProduction(null);

    const result = transformSync(code, {
      filename: 'dummy-file-name.js',
      presets: config.presets,
      plugins: config.plugins,
    });

    expect(result.code).toContain('id: "app.welcome"');
    expect(result.code).toContain('defaultMessage: "Welcome, {name}!"');
    expect(result.code).not.toContain('description:');
  });

  it('should remove defaultMessage when i18nRemoveDefaultMessage is true', () => {
    const config = getBabePresetConfigForMcAppForProduction(null, {
      i18nRemoveDefaultMessage: true,
    });

    const result = transformSync(code, {
      filename: 'dummy-file-name.js',
      presets: config.presets,
      plugins: config.plugins,
    });

    expect(result.code).toContain('id: "app.welcome"');
    expect(result.code).not.toContain('defaultMessage: "Welcome, {name}!"');
    expect(result.code).not.toContain('description:');
  });

  it('should parse defaultMessage into AST when i18nAst is true', () => {
    const config = getBabePresetConfigForMcAppForProduction(null, {
      i18nAst: true,
    });

    const result = transformSync(code, {
      filename: 'dummy-file-name.js',
      presets: config.presets,
      plugins: config.plugins,
    });

    // Check that the welcome message has the correct AST structure
    expect(result.code).toMatch(
      /welcome:\s*{\s*id:\s*"app\.welcome",\s*defaultMessage:\s*\[\s*{\s*"type":\s*0,\s*"value":\s*"Welcome,\s*"\s*},\s*{\s*"type":\s*1,\s*"value":\s*"name"\s*},\s*{\s*"type":\s*0,\s*"value":\s*"!"\s*}\s*\]/
    );

    // Check that description is removed
    expect(result.code).not.toContain('description:');
  });
});
