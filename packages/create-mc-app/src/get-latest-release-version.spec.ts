import { parseLatestReleaseVersion } from './get-latest-release-version';

describe('parseLatestReleaseVersion', () => {
  it('should read the version printed by npm 11 and earlier', () => {
    expect(parseLatestReleaseVersion('"27.17.0"\n')).toBe('27.17.0');
  });

  it('should read the version printed by npm 12 as a one-element array', () => {
    expect(parseLatestReleaseVersion('[\n  "27.17.0"\n]\n')).toBe('27.17.0');
  });

  it.each([
    ['empty output', ''],
    ['output that is not JSON', 'npm error code E404'],
    ['an empty array', '[]'],
    ['a value that is not a version', '"latest"'],
    ['a full package document', '{ "version": "27.17.0" }'],
    ['an array of package documents', '[{ "version": "27.17.0" }]'],
  ])('should return undefined for %s', (_, stdout) => {
    expect(parseLatestReleaseVersion(stdout)).toBeUndefined();
  });
});
