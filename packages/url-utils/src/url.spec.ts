import { joinPaths, trimLeadingAndTrailingSlashes } from './url';

describe('joinPaths', () => {
  it('should join multiple paths', () => {
    expect(joinPaths('foo', 'bar')).toBe('/foo/bar');
  });
  it('should not add a slash for a single path', () => {
    expect(joinPaths('foo')).toBe('/foo');
  });
  it('should join paths that have trailing slash', () => {
    expect(joinPaths('foo/', 'bar/')).toBe('/foo/bar');
  });
  it('should join paths that have initial slash', () => {
    expect(joinPaths('/foo', '/bar')).toBe('/foo/bar');
    expect(joinPaths('/http://localhost:4000/', '/bar')).toBe(
      '/http://localhost:4000/bar'
    );
  });
  it('should trim slashes after joining paths, to remove the initial slash', () => {
    expect(
      trimLeadingAndTrailingSlashes(
        joinPaths('/http://localhost:4000/', '/bar')
      )
    ).toBe('http://localhost:4000/bar');
  });
  it('should throw if a path is not a string', () => {
    // @ts-ignore
    expect(() => joinPaths('foo', 2)).toThrow(
      'Expected path "2" to be a "string", but got "number"'
    );
  });
});
