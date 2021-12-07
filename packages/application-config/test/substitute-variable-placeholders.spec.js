/* eslint-disable no-template-curly-in-string */
import path from 'path';
import substituteVariablePlaceholders from '../src/substitute-variable-placeholders';

const applicationPath = path.join(__dirname, 'fixtures');

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
          '${path:@commercetools-frontend/assets/application-icons/Rocket.svg}',
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
