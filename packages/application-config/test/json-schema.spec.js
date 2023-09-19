import { LOADED_CONFIG_TYPES } from '../src/constants';
import {
  validateConfig,
  validateEntryPointUriPath,
  validateSubmenuLinks,
  validateAdditionalOAuthScopes,
} from '../src/validations';
import fixtureConfigEnvVariables from './fixtures/custom-applications/config-env-variables.json';
import fixtureConfigFilePathVariables from './fixtures/custom-applications/config-file-path-variables.json';
import fixtureConfigFull from './fixtures/custom-applications/config-full.json';
import fixtureConfigIntlVariables from './fixtures/custom-applications/config-intl-variables.json';
import fixtureConfigOidc from './fixtures/custom-applications/config-oidc.json';
import fixtureConfigSimple from './fixtures/custom-applications/config-simple.json';

describe.each`
  name                     | config
  ${'Simple'}              | ${fixtureConfigSimple}
  ${'Full'}                | ${fixtureConfigFull}
  ${'OIDC'}                | ${fixtureConfigOidc}
  ${'Env variables'}       | ${fixtureConfigEnvVariables}
  ${'Intl variables'}      | ${fixtureConfigIntlVariables}
  ${'File path variables'} | ${fixtureConfigFilePathVariables}
`('validating config "$name"', ({ config }) => {
  it('should detect the config as valid', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, config)
    ).not.toThrow();
  });
});

describe.each`
  entryPointUriPath
  ${'avengers'}
  ${'the-avengers'}
  ${'the_avengers'}
  ${'avengers01'}
  ${'avengers-01'}
  ${'avengers_01'}
`('validating "entryPointUriPath"', ({ entryPointUriPath }) => {
  it(`should validate "${entryPointUriPath}" correctly`, () => {
    expect(() =>
      validateEntryPointUriPath({
        ...fixtureConfigSimple,
        entryPointUriPath,
      })
    ).not.toThrow();
  });
});

describe('invalid configurations', () => {
  it('should validate that "env" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        env: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'env'"`
    );
  });
  it('should validate that "env.development" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        env: {},
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/env must have required property 'development'"`
    );
  });
  it('should validate that "env.production" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        env: {
          development: {
            initialProjectKey: '',
          },
        },
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/env must have required property 'production'"`
    );
  });
  it('should validate that "entryPointUriPath" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        entryPointUriPath: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'entryPointUriPath'"`
    );
  });
  describe.each`
    entryPointUriPath
    ${'-avengers'}
    ${'avengers-'}
    ${'_avengers'}
    ${'avengers_'}
    ${'-avengers_'}
    ${'_avengers-'}
    ${'the-_avengers'}
    ${'the_-avengers'}
  `('validating "entryPointUriPath"', ({ entryPointUriPath }) => {
    it(`should validate "${entryPointUriPath}" wrong value`, () => {
      expect(() =>
        validateEntryPointUriPath({
          ...fixtureConfigSimple,
          entryPointUriPath,
        })
      ).toThrow(/The value may be between 2 and 64 characters/);
    });
  });
  it('should validate that "cloudIdentifier" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        cloudIdentifier: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'cloudIdentifier'"`
    );
  });
  it('should validate that "oAuthScopes" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        oAuthScopes: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'oAuthScopes'"`
    );
  });
  it('should validate that "oAuthScopes.view" contains OAuth Scopes starting with "view_"', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        oAuthScopes: {
          view: ['view_products', 'manage_orders'],
        },
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/oAuthScopes/view/1 must match pattern "view_(.*)""`
    );
  });
  it('should validate that "oAuthScopes.manage" contains OAuth Scopes starting with "manage_"', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        oAuthScopes: {
          manage: ['view_products', 'manage_orders'],
        },
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/oAuthScopes/manage/0 must match pattern "manage_(.*)""`
    );
  });
  it('should validate that "additionalOAuthScopes" is an array', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        additionalOAuthScopes: {
          name: 'movies',
          view: ['view_products', 'manage_orders'],
        },
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/additionalOAuthScopes must be array"`
    );
  });
  it('should validate that "additionalOAuthScopes[0].name" is provided', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            view: ['view_products'],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/additionalOAuthScopes/0 must have required property 'name'"`
    );
  });
  it('should validate that "additionalOAuthScopes[0].view" contains OAuth Scopes starting with "view_"', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            name: 'movies',
            view: ['view_products', 'manage_orders'],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/additionalOAuthScopes/0/view/1 must match pattern "view_(.*)""`
    );
  });
  it('should validate that "additionalOAuthScopes[0].manage" contains OAuth Scopes starting with "manage_"', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            name: 'movies',
            manage: ['view_products', 'manage_orders'],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/additionalOAuthScopes/0/manage/0 must match pattern "manage_(.*)""`
    );
  });
  it('should validate that "icon" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        icon: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'icon'"`
    );
  });
  it('should validate that "mainMenuLink" is defined', () => {
    expect(() =>
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, {
        ...fixtureConfigSimple,
        mainMenuLink: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'mainMenuLink'"`
    );
  });
  it('should validate that "uriPath" for "submenuLinks" is unique', () => {
    expect(() =>
      validateSubmenuLinks({
        ...fixtureConfigSimple,
        submenuLinks: [
          {
            uriPath: 'custom-app/avengers',
            defaultLabel: 'avengers',
            permissions: [],
            labelAllLocales: [],
          },
          {
            uriPath: 'custom-app/avengers',
            defaultLabel: 'justice-league',
            permissions: [],
            labelAllLocales: [],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"Duplicate URI path. Every submenu link must have a unique URI path value"`
    );
  });
  it('should validate that additionalOauthScope name is unique', () => {
    expect(() =>
      validateAdditionalOAuthScopes({
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            name: 'movies',
            view: ['view_products'],
            manage: [],
          },

          {
            name: 'movies',
            view: ['view_channels'],
            manage: [],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"Duplicate additional permission group name "movies". Every additional permission must have a unique name"`
    );
  });
  it('should validate the additional permission names match the regex', () => {
    expect(() =>
      validateAdditionalOAuthScopes({
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            name: '-movies',
            view: ['view_products'],
            manage: [],
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"Additional permission group name "-movies" is invalid. The value may be between 2 and 64 characters and only contain alphabetic lowercase characters and non-consecutive hyphens. Leading and trailing hyphens are also not allowed"`
    );
  });
  it('should validate that at least one additional OAuth Scope is defined for a permission group', () => {
    expect(() =>
      validateAdditionalOAuthScopes({
        ...fixtureConfigSimple,
        additionalOAuthScopes: [
          {
            name: 'movies',
            view: [],
            // mind that `manage` is undefined
          },
        ],
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"At least one OAuth Scope for permission group name "movies" is required"`
    );
  });
});
