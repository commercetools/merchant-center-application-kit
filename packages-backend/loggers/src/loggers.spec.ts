import createApplicationLogger from './create-application-logger';
import rewriteFieldsFormatter from './formatters/rewrite-fields';

describe('application logger', () => {
  it('should log and rewrite fields', () => {
    // @ts-ignore
    console._stdout.write = jest.fn();
    const logger = createApplicationLogger({
      json: true,
      formatters: [
        rewriteFieldsFormatter({
          fields: [
            {
              from: 'meta.req.headers',
              to: 'meta.req.headersJsonString',
              replaceValue: (value) => {
                return JSON.stringify(value);
              },
            },
          ],
        }),
      ],
    });
    logger.info('Test log', {
      meta: { req: { headers: { Accept: 'application/json' } } },
    });
    // @ts-ignore
    expect(console._stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(`\"level\":\"info\"`)
    );
    // @ts-ignore
    expect(console._stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(`\"message\":\"Test log\"`)
    );
    // @ts-ignore
    expect(console._stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(
        `\"meta\":${JSON.stringify({
          req: {
            headersJsonString: JSON.stringify({ Accept: 'application/json' }),
          },
        })}`
      )
    );
  });
  it('should not mutate meta object', () => {
    // @ts-ignore
    console._stdout.write = jest.fn();
    const logger = createApplicationLogger({
      json: true,
      formatters: [
        rewriteFieldsFormatter({
          fields: [
            {
              from: 'meta.req.headers.authorization',
              to: 'meta.req.headers.authorization',
              replaceValue: () => '[REDACTED]',
            },
            {
              from: 'meta.req',
              to: 'meta.req',
              replaceValue: (value) => {
                return {
                  // @ts-expect-error
                  headers: value.headers,
                  // @ts-expect-error
                  headersJsonString: JSON.stringify(value.headers),
                };
              },
            },
          ],
        }),
      ],
    });
    const fakeRequest = {
      headers: {
        authorization: 'Bearer 123',
      },
    };
    logger.info('Test log', {
      meta: { req: { headers: fakeRequest.headers } },
    });
    expect(fakeRequest).toEqual({
      headers: {
        authorization: 'Bearer 123',
      },
    });
    // @ts-ignore
    expect(console._stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(
        `\"meta\":${JSON.stringify({
          req: {
            headers: {
              authorization: '[REDACTED]',
            },
            headersJsonString: JSON.stringify({ authorization: '[REDACTED]' }),
          },
        })}`
      )
    );
  });
});
