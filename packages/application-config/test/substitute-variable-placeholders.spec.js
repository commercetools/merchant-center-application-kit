/* eslint-disable no-template-curly-in-string */
import path from 'path';
import substituteVariablePlaceholders from '../src/substitute-variable-placeholders';

const applicationPath = path.join(__dirname, 'fixtures/custom-applications');

describe('providing a config with env variable placeholders', () => {
  it('should substitute all values', () => {
    const processEnv = {
      TITLE: 'Awesome',
      APP_URL: 'https://app.com',
      CDN_REGION: 'eu',
      CDN_ID: 'cdn-id',
      STATUS: '200',
      EMPTY: '',
    };
    const result = substituteVariablePlaceholders(
      {
        title: 'The title is ${env:TITLE}',
        count: 1,
        isActive: false,
        urls: [
          'https://one.com',
          'https://two.com',
          '${env:APP_URL}',
          'https://${env:CDN_REGION}.${env:CDN_ID}.com',
        ],
        some: {
          nested: {
            properties: {
              status: '${env:STATUS}',
            },
          },
        },
        empty: '${env:EMPTY}',
        moduleFilePath:
          '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
        relativeFilePath: '${path:./i18n/data/en.json}',
        labelAllLocales: [
          {
            locale: 'en',
            value: '${intl:en:Menu.Avengers}',
          },
          {
            locale: 'de',
            value: '${intl:de:Menu.Avengers}',
          },
        ],
      },
      {
        processEnv,
        applicationPath,
      }
    );
    expect(result).toEqual({
      title: 'The title is Awesome',
      count: 1,
      isActive: false,
      urls: [
        'https://one.com',
        'https://two.com',
        'https://app.com',
        'https://eu.cdn-id.com',
      ],
      some: {
        nested: {
          properties: {
            status: '200',
          },
        },
      },
      empty: '',
      moduleFilePath: expect.stringContaining('<svg'),
      relativeFilePath: expect.stringContaining('"Menu.Avengers"'),
      labelAllLocales: [
        {
          locale: 'en',
          value: 'The Avengers',
        },
        {
          locale: 'de',
          value: 'Die Avengers',
        },
      ],
    });
  });

  it('should handle replacement values with regex special characters', () => {
    const processEnv = {
      REGEX_CHARS: 'Value with $pecial (regex) chars []*+?.|\\^',
      NORMAL: 'normal-value',
    };
    const result = substituteVariablePlaceholders(
      {
        specialValue: 'The value is: ${env:REGEX_CHARS}',
        mixed: 'Normal ${env:NORMAL} and special ${env:REGEX_CHARS} values',
        onlySpecial: '${env:REGEX_CHARS}',
      },
      {
        processEnv,
        applicationPath,
      }
    );
    expect(result).toEqual({
      specialValue: 'The value is: Value with $pecial (regex) chars []*+?.|\\^',
      mixed:
        'Normal normal-value and special Value with $pecial (regex) chars []*+?.|\\^ values',
      onlySpecial: 'Value with $pecial (regex) chars []*+?.|\\^',
    });
  });
});

describe('path variable placeholder security', () => {
  it('should block path traversal in bare module specifiers', () => {
    expect(() => {
      substituteVariablePlaceholders(
        {
          icon: '${path:some-pkg/../../../../etc/passwd}',
        },
        {
          processEnv: {},
          applicationPath,
        }
      );
    }).toThrow('Path traversal in module specifiers is not allowed');
  });

  it('should block path traversal with nested segments in bare module specifiers', () => {
    expect(() => {
      substituteVariablePlaceholders(
        {
          icon: '${path:some-pkg/sub/../../../../../../etc/shadow}',
        },
        {
          processEnv: {},
          applicationPath,
        }
      );
    }).toThrow('Path traversal in module specifiers is not allowed');
  });

  it('should allow bare module specifiers without path traversal (e.g. hoisted CI deps)', () => {
    // Bare module specifiers like "@scope/pkg/file.svg" pass the security
    // check even when they resolve outside the workspace root (e.g. to
    // /layers/google.nodejs.yarn/yarn_modules/node_modules/).
    // Here the module doesn't exist, so require.resolve throws — but the
    // error must be MODULE_NOT_FOUND, not the security gate.
    expect(() => {
      substituteVariablePlaceholders(
        {
          icon: '${path:nonexistent-external-pkg/icon.svg}',
        },
        {
          processEnv: {},
          applicationPath,
        }
      );
    }).toThrow(/Cannot (?:find|resolve) module/);
  });

  it('should allow scoped bare module specifiers without path traversal', () => {
    expect(() => {
      substituteVariablePlaceholders(
        {
          icon: '${path:@nonexistent-scope/pkg/icon.svg}',
        },
        {
          processEnv: {},
          applicationPath,
        }
      );
    }).toThrow(/Cannot (?:find|resolve) module/);
  });
});

describe('providing a config without env variable placeholders', () => {
  it('should return the config as-is', () => {
    const result = substituteVariablePlaceholders(
      {
        title: 'The title is Awesome',
        count: 1,
        isActive: false,
        urls: [
          'https://one.com',
          'https://two.com',
          'https://app.com',
          'https://eu.cdn-id.com',
        ],
      },
      {
        processEnv: {},
        applicationPath,
      }
    );
    expect(result).toEqual({
      title: 'The title is Awesome',
      count: 1,
      isActive: false,
      urls: [
        'https://one.com',
        'https://two.com',
        'https://app.com',
        'https://eu.cdn-id.com',
      ],
    });
  });
});
