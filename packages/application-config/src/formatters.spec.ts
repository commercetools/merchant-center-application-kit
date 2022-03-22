import { entryPointUriPathToPermissionKeys } from './formatters';

describe.each`
  entryPointUriPath | formattedResourceAccessKey
  ${'avengers'}     | ${'Avengers'}
  ${'the-avengers'} | ${'TheAvengers'}
  ${'the_avengers'} | ${'The_Avengers'}
  ${'avengers-01'}  | ${'Avengers/01'}
  ${'avengers_01'}  | ${'Avengers_01'}
`(
  'formatting the entryPointUriPath "$entryPointUriPath" to a resource access key "$formattedResourceAccessKey"',
  ({ entryPointUriPath, formattedResourceAccessKey }) => {
    it(`should format correctly`, () => {
      expect(entryPointUriPathToPermissionKeys(entryPointUriPath)).toEqual({
        View: `View${formattedResourceAccessKey}`,
        Manage: `Manage${formattedResourceAccessKey}`,
      });
    });
  }
);

describe.each`
  internalApplicationGroup | formattedResourceAccessKey
  ${'products'}            | ${'Products'}
  ${'developerSettings'}   | ${'DeveloperSettings'}
`(
  'formatting the internal applications group "$internalApplicationGroup" to a resource access key "$formattedResourceAccessKey"',
  ({ internalApplicationGroup, formattedResourceAccessKey }) => {
    it(`should format correctly`, () => {
      expect(
        entryPointUriPathToPermissionKeys(internalApplicationGroup)
      ).toEqual({
        View: `View${formattedResourceAccessKey}`,
        Manage: `Manage${formattedResourceAccessKey}`,
      });
    });
  }
);
