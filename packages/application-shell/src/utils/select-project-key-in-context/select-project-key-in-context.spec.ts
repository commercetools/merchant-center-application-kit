import { STORAGE_KEYS } from '@commercetools-frontend/constants';
import selectProjectKeyInContext from './select-project-key-in-context';

describe.each`
  pathname                         | expectedProjectKey
  ${'/my-project-key'}             | ${'my-project-key'}
  ${'/my-project-key/products'}    | ${'my-project-key'}
  ${'/account/profile'}            | ${undefined}
  ${'/login'}                      | ${undefined}
  ${'/logout'}                     | ${undefined}
  ${'/agent-sphere'}               | ${'previous-project-key'}
  ${'/agent-sphere/conversations'} | ${'previous-project-key'}
`('when location is $pathname', ({ pathname, expectedProjectKey }) => {
  beforeEach(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.ACTIVE_PROJECT_KEY,
      'previous-project-key'
    );
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it(`should return project key as "${expectedProjectKey}"`, () => {
    expect(selectProjectKeyInContext({ pathname })).toBe(expectedProjectKey);
  });
});

describe('when there is no previously used project', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should fall back to the default project of the user', () => {
    expect(
      selectProjectKeyInContext({
        pathname: '/agent-sphere',
        defaultProjectKeyOfUser: 'default-project-key',
      })
    ).toBe('default-project-key');
  });

  it('should return no project key when the user has no default project', () => {
    expect(selectProjectKeyInContext({ pathname: '/agent-sphere' })).toBe(
      undefined
    );
  });
});
