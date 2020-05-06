import rewriteFieldsFormatter from './formatters/rewrite-fields';
import createApplicationLogger from './create-application-logger';

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
});
