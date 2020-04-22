const substituteEnvVariablePlaceholders = require('./substitute-env-variable-placeholders');

describe('providing a config with env variable placeholders', () => {
  it('should substitute all values', () => {
    process.env = {
      TITLE: 'Awesome',
      APP_URL: 'https://app.com',
      CDN_REGION: 'eu',
      CDN_ID: 'cdn-id',
    };
    const result = substituteEnvVariablePlaceholders({
      title: 'The title is ${env:TITLE}',
      count: 1,
      isActive: false,
      urls: [
        'https://one.com',
        'https://two.com',
        '${env:APP_URL}',
        'https://${env:CDN_REGION}.${env:CDN_ID}.com',
      ],
    });
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

describe('providing a config without env variable placeholders', () => {
  it('should return the config as-is', () => {
    const result = substituteEnvVariablePlaceholders({
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
