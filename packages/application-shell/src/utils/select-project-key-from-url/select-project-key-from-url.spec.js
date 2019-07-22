import selectProjectKeyFromUrl from './select-project-key-from-url';

// eslint-disable-next-line jest/valid-describe
describe.each([
  ['/login', undefined],
  ['/logout', undefined],
  ['/account', undefined],
  ['/foo', 'foo'],
  ['/foo/bar', 'foo'],
  ['/foo/bar/123', 'foo'],
])('when location is %s', (path, expected) => {
  it(`should return project key as "${expected}"`, () => {
    expect(selectProjectKeyFromUrl(path)).toBe(expected);
  });
});
