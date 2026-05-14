import createApplicationLogger from './create-application-logger';
import redactFieldsFormatter from './formatters/redact-fields';
import rewriteFieldsFormatter from './formatters/rewrite-fields';

describe('application logger', () => {
  describe('when replacing field', () => {
    it('should log and replace fields', () => {
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
      // Note: that both only headersJsonString is present
      // @ts-ignore
      expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
        [
          "{"level":"info","message":"Test log","meta":{"req":{"headersJsonString":"{\\"Accept\\":\\"application/json\\"}"}}}
        ",
        ]
      `);
    });
  });
  describe('when redacting fields', () => {
    it('should replace configured paths with [REDACTED] in log output', () => {
      // @ts-ignore
      console._stdout.write = jest.fn();
      const logger = createApplicationLogger({
        json: true,
        formatters: [
          redactFieldsFormatter({
            fields: ['meta.req.headers.authorization'],
          }),
        ],
      });
      logger.info('Test log', {
        meta: {
          req: {
            headers: {
              Accept: 'application/json',
              authorization: 'Bearer secret',
            },
          },
        },
      });
      // @ts-ignore
      expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
        [
          "{"level":"info","message":"Test log","meta":{"req":{"headers":{"Accept":"application/json","authorization":"[REDACTED]"}}}}
        ",
        ]
      `);
    });

    it('should not mutate meta when redacting fields', () => {
      // @ts-ignore
      console._stdout.write = jest.fn();
      const logger = createApplicationLogger({
        json: true,
        formatters: [
          redactFieldsFormatter({
            fields: ['meta.secret'],
          }),
        ],
      });
      const meta = {
        secret: 'do-not-touch-original',
        keep: true,
      };
      logger.info('Test log', { meta });
      expect(meta).toEqual({
        secret: 'do-not-touch-original',
        keep: true,
      });
      // @ts-ignore
      expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
        [
          "{"level":"info","message":"Test log","meta":{"keep":true,"secret":"[REDACTED]"}}
        ",
        ]
      `);
    });

    it('should leave log output unchanged when the redacted path is absent', () => {
      // @ts-ignore
      console._stdout.write = jest.fn();
      const logger = createApplicationLogger({
        json: true,
        formatters: [
          redactFieldsFormatter({
            fields: ['meta.req.headers.authorization'],
          }),
        ],
      });
      logger.info('Test log', {
        meta: {
          req: {
            headers: {
              Accept: 'application/json',
            },
          },
        },
      });
      // @ts-ignore
      expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
        [
          "{"level":"info","message":"Test log","meta":{"req":{"headers":{"Accept":"application/json"}}}}
        ",
        ]
      `);
    });
  });

  describe('when not replacing field', () => {
    it('should log and add but not replace fields', () => {
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
                preserveFromField: true,
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

      // Note: that both headers and headersJsonString are present
      // @ts-ignore
      expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
        [
          "{"level":"info","message":"Test log","meta":{"req":{"headers":{"Accept":"application/json"},"headersJsonString":"{\\"Accept\\":\\"application/json\\"}"}}}
        ",
        ]
      `);
    });
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
    // Note that authorization is REDACTED in both headers and headersJsonString
    // @ts-ignore
    expect(console._stdout.write.mock.lastCall).toMatchInlineSnapshot(`
      [
        "{"level":"info","message":"Test log","meta":{"req":{"headers":{"authorization":"[REDACTED]"},"headersJsonString":"{\\"authorization\\":\\"[REDACTED]\\"}"}}}
      ",
      ]
    `);
  });
});
