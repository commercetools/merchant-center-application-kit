import {
  PROJECT_KEY_REGEX,
  ENTRY_POINT_URI_PATH_REGEX,
  PERMISSION_GROUP_NAME_REGEX,
} from './constants';

function generateRandomString(length: number) {
  return Array.from({ length: length + 1 }).join('x');
}

describe.each`
  projectKey                           | isValid
  ${'hello'}                           | ${true}
  ${'i-am-a-valid-project-key'}        | ${true}
  ${'-invalid'}                        | ${false}
  ${'_invalid'}                        | ${false}
  ${'x'}                               | ${false}
  ${'xy'}                              | ${true}
  ${generateRandomString(36)}          | ${true}
  ${generateRandomString(37)}          | ${false}
  ${'__'}                              | ${false}
  ${'--'}                              | ${false}
  ${'..'}                              | ${false}
  ${'@@'}                              | ${false}
  ${'??'}                              | ${false}
  ${'&&'}                              | ${false}
  ${'##'}                              | ${false}
  ${'invalid-'}                        | ${false}
  ${'invalid_'}                        | ${false}
  ${'not valid'}                       | ${false}
  ${'this     should not  be   valid'} | ${false}
  ${'this--is-valid'}                  | ${true}
  ${'this__is-valid'}                  | ${true}
  ${'this-_is-valid'}                  | ${true}
  ${'this_-is-valid'}                  | ${true}
  ${'this---is-not-valid'}             | ${false}
  ${'this___is-not-valid'}             | ${false}
  ${'this-_-is-not-valid'}             | ${false}
  ${'This-Is-Not-VALID'}               | ${false}
`(
  'Validating project key "$projectKey"',
  ({ projectKey, isValid }: { projectKey: string; isValid: boolean }) => {
    it(`should validate the key as ${isValid}`, () => {
      const matched = projectKey.match(PROJECT_KEY_REGEX);
      expect(Boolean(matched)).toBe(isValid);
    });
  }
);

describe.each`
  entryPointUriPath                    | isValid
  ${'hello'}                           | ${true}
  ${'i-am-a-valid-entry-point'}        | ${true}
  ${'-invalid'}                        | ${false}
  ${'_invalid'}                        | ${false}
  ${'x'}                               | ${false}
  ${'xy'}                              | ${true}
  ${generateRandomString(64)}          | ${true}
  ${generateRandomString(65)}          | ${false}
  ${'__'}                              | ${false}
  ${'--'}                              | ${false}
  ${'..'}                              | ${false}
  ${'@@'}                              | ${false}
  ${'??'}                              | ${false}
  ${'&&'}                              | ${false}
  ${'##'}                              | ${false}
  ${'invalid-'}                        | ${false}
  ${'invalid_'}                        | ${false}
  ${'not valid'}                       | ${false}
  ${'this     should not  be   valid'} | ${false}
  ${'this--is-not-valid'}              | ${false}
  ${'this__is-not-valid'}              | ${false}
  ${'this-_is-not-valid'}              | ${false}
  ${'this_-is-not-valid'}              | ${false}
  ${'this---is-not-valid'}             | ${false}
  ${'this___is-not-valid'}             | ${false}
  ${'this-_-is-not-valid'}             | ${false}
  ${'This-Is-Not-VALID'}               | ${false}
`(
  'Validating entry point uri path "$entryPointUriPath"',
  ({
    entryPointUriPath,
    isValid,
  }: {
    entryPointUriPath: string;
    isValid: boolean;
  }) => {
    it(`should validate the key as ${isValid}`, () => {
      const matched = entryPointUriPath.match(ENTRY_POINT_URI_PATH_REGEX);
      expect(Boolean(matched)).toBe(isValid);
    });
  }
);

describe.each`
  permissionGroup                      | isValid
  ${'hello'}                           | ${true}
  ${'i-am-a-valid-entry-point'}        | ${true}
  ${'-invalid'}                        | ${false}
  ${'_valid'}                          | ${true}
  ${'x'}                               | ${false}
  ${'xy'}                              | ${true}
  ${generateRandomString(64)}          | ${true}
  ${generateRandomString(65)}          | ${false}
  ${'__'}                              | ${true}
  ${'--'}                              | ${false}
  ${'..'}                              | ${false}
  ${'@@'}                              | ${false}
  ${'??'}                              | ${false}
  ${'&&'}                              | ${false}
  ${'##'}                              | ${false}
  ${'invalid-'}                        | ${false}
  ${'valid_'}                          | ${true}
  ${'not valid'}                       | ${false}
  ${'this     should not  be   valid'} | ${false}
  ${'this--is-not-valid'}              | ${false}
  ${'this__is-not-valid'}              | ${false}
  ${'this-_is-not-valid'}              | ${false}
  ${'this_-is-not-valid'}              | ${false}
  ${'this---is-not-valid'}             | ${false}
  ${'this___is-not-valid'}             | ${false}
  ${'this-_-is-not-valid'}             | ${false}
  ${'This-Is-Not-VALID'}               | ${false}
`(
  'Validating permission group name "$permissionGroup"',
  ({
    permissionGroup,
    isValid,
  }: {
    permissionGroup: string;
    isValid: boolean;
  }) => {
    it(`should validate the key as ${isValid}`, () => {
      const matched = permissionGroup.match(PERMISSION_GROUP_NAME_REGEX);
      expect(Boolean(matched)).toBe(isValid);
    });
  }
);
