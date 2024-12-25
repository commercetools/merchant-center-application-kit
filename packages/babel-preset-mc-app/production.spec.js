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

  it('should remove description by default', () => {
    const config = getBabePresetConfigForMcAppForProduction(null);

    const result = transformSync(code, {
      filename: 'dummy-file-name.js',
      presets: config.presets,
      plugins: config.plugins,
    });

    expect(result.code).toMatchInlineSnapshot(`
      ""use strict";

      var _reactIntl = require("react-intl");
      const messages = (0, _reactIntl.defineMessages)({
        welcome: {
          id: "app.welcome",
          defaultMessage: "Welcome, {name}!"
        }
      });"
    `);
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

    expect(result.code).toMatchInlineSnapshot(`
      ""use strict";

      var _reactIntl = require("react-intl");
      const messages = (0, _reactIntl.defineMessages)({
        welcome: {
          id: "app.welcome"
        }
      });"
    `);
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

    expect(result.code).toMatchInlineSnapshot(`
      ""use strict";

      var _reactIntl = require("react-intl");
      const messages = (0, _reactIntl.defineMessages)({
        welcome: {
          id: "app.welcome",
          defaultMessage: [{
            "type": 0,
            "value": "Welcome, "
          }, {
            "type": 1,
            "value": "name"
          }, {
            "type": 0,
            "value": "!"
          }]
        }
      });"
    `);
  });
});
