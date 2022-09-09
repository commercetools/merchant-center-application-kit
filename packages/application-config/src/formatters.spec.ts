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
  entryPointUriPath | formattedResourceAccessKey | additionalPermissionNames | formattedResourceAccessKeyAdditionalNames
  ${'avengers'}     | ${'Avengers'}              | ${['books']}              | ${'AvengersBooks'}
  ${'the-avengers'} | ${'TheAvengers'}           | ${['the-books']}          | ${'TheAvengersTheBooks'}
  ${'the_avengers'} | ${'The_Avengers'}          | ${['the_books']}          | ${'The_AvengersThe_Books'}
  ${'avengers-01'}  | ${'Avengers/01'}           | ${['books-01']}           | ${'Avengers/01Books/01'}
  ${'avengers_01'}  | ${'Avengers_01'}           | ${['books_01']}           | ${'Avengers_01Books_01'}
`(
  'formatting the entryPointUriPath "$entryPointUriPath" with additional permission names "$additionalPermissionNames" to a resource access key "$formattedResourceAccessKey" and "$formattedResourceAccessKeyAdditionalNames"',
  ({
    entryPointUriPath,
    formattedResourceAccessKey,
    additionalPermissionNames,
    formattedResourceAccessKeyAdditionalNames,
  }) => {
    it(`should format correctly`, () => {
      const [, additionalPermissionKey] =
        formattedResourceAccessKeyAdditionalNames.split(
          formattedResourceAccessKey
        );
      expect(
        entryPointUriPathToPermissionKeys(
          entryPointUriPath,
          additionalPermissionNames
        )
      ).toEqual({
        View: `View${formattedResourceAccessKey}`,
        Manage: `Manage${formattedResourceAccessKey}`,
        [`View${additionalPermissionKey}`]: `View${formattedResourceAccessKeyAdditionalNames}`,
        [`Manage${additionalPermissionKey}`]: `Manage${formattedResourceAccessKeyAdditionalNames}`,
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
