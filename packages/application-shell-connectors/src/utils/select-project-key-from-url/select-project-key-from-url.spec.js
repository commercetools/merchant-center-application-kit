import selectProjectKeyFromUrl from './select-project-key-from-url';

describe.each`
  uriPath                             | expectedProjectKey
  ${'/login'}                         | ${undefined}
  ${'/logout'}                        | ${undefined}
  ${'/account'}                       | ${undefined}
  ${'/foo'}                           | ${'foo'}
  ${'/foo/bar'}                       | ${'foo'}
  ${'/foo/bar/123'}                   | ${'foo'}
  ${'/custom-views/123/projects/bar'} | ${'bar'}
`('when location is $uriPath', ({ uriPath, expectedProjectKey }) => {
  it(`should return project key as "${expectedProjectKey}"`, () => {
    expect(selectProjectKeyFromUrl(uriPath)).toBe(expectedProjectKey);
  });
});
