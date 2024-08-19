import { parseIps, createAccessLogSkipper } from './helpers';

describe('parseIps', () => {
  describe.each`
    header                    | expectedIps
    ${undefined}              | ${[]}
    ${'1.1.1.1'}              | ${['1.1.1.1']}
    ${'1.1.1.1,2.2.2.2'}      | ${['1.1.1.1', '2.2.2.2']}
    ${['1.1.1.1']}            | ${['1.1.1.1']}
    ${['1.1.1.1', '2.2.2.2']} | ${['1.1.1.1', '2.2.2.2']}
  `(`given the header x-forwarded-for "$header"`, ({ header, expectedIps }) => {
    it(`it should extract list of IPs as ${expectedIps}`, () => {
      expect(
        parseIps(
          // @ts-ignore: this should be a Request object
          { headers: { 'x-forwarded-for': header } }
        )
      ).toEqual(expectedIps);
    });
  });
});

describe('createAccessLogSkipper', () => {
  describe.each`
    originalUrl                        | ignoreUrl                    | shouldSkip
    ${'/'}                             | ${'/'}                       | ${true}
    ${'/favicon.ico'}                  | ${'/favicon.ico'}            | ${true}
    ${'/favicon.ico'}                  | ${/favicon/}                 | ${true}
    ${'/static/favicon.ico'}           | ${'/favicon.ico'}            | ${false}
    ${'/static/favicon.ico'}           | ${/^\/static\/(.*)/}         | ${true}
    ${'/static/chunks/webpack-123.js'} | ${'/static'}                 | ${false}
    ${'/static/chunks/webpack-123.js'} | ${/^\/static\/chunks\/(.*)/} | ${true}
  `(`given "$originalUrl"`, ({ originalUrl, ignoreUrl, shouldSkip }) => {
    it(`when ignoring "${ignoreUrl}" it should result in skip: ${shouldSkip}`, () => {
      const skip = createAccessLogSkipper({ ignoreUrls: [ignoreUrl] });
      expect(
        skip(
          // @ts-ignore: this should be a Request object
          { originalUrl }
        )
      ).toEqual(shouldSkip);
    });
  });

  it('should skip if option "silent" is true', () => {
    const skip = createAccessLogSkipper({ silent: true });
    expect(
      skip(
        // @ts-ignore: this should be a Request object
        {}
      )
    ).toEqual(true);
  });
});
