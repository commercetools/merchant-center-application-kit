import { CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH } from '@commercetools-frontend/constants';
import {
  entryPointUriPathToPermissionKeys,
  resolveCustomViewResourceAccesses,
} from './formatters';

describe.each`
  entryPointUriPath                        | formattedResourceAccessKey
  ${'avengers'}                            | ${'Avengers'}
  ${'the-avengers'}                        | ${'TheAvengers'}
  ${'the_avengers'}                        | ${'The_Avengers'}
  ${'avengers-01'}                         | ${'Avengers/01'}
  ${'avengers_01'}                         | ${'Avengers_01'}
  ${CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH} | ${''}
`(
  'formatting the entryPointUriPath "$entryPointUriPath" to a resource access key "$formattedResourceAccessKey"',
  ({ entryPointUriPath, formattedResourceAccessKey }) => {
    it(`should format correctly`, () => {
      const resourceAccessKeys =
        entryPointUriPathToPermissionKeys(entryPointUriPath);
      expect(resourceAccessKeys.View).toBe(`View${formattedResourceAccessKey}`);
      expect(resourceAccessKeys.Manage).toBe(
        `Manage${formattedResourceAccessKey}`
      );
    });
  }
);

describe.each`
  entryPointUriPath                        | formattedResourceAccessKey | permissionGroupNames | formattedResourceAccessKeyAdditionalNames
  ${'avengers'}                            | ${'Avengers'}              | ${['books']}         | ${'AvengersBooks'}
  ${'the-avengers'}                        | ${'TheAvengers'}           | ${['the-books']}     | ${'TheAvengersTheBooks'}
  ${'the_avengers'}                        | ${'The_Avengers'}          | ${['the-books']}     | ${'The_AvengersTheBooks'}
  ${'avengers-01'}                         | ${'Avengers/01'}           | ${['the-movies']}    | ${'Avengers/01TheMovies'}
  ${'avengers_01'}                         | ${'Avengers_01'}           | ${['the-movies']}    | ${'Avengers_01TheMovies'}
  ${CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH} | ${''}                      | ${['the-movies']}    | ${'TheMovies'}
`(
  'formatting the entryPointUriPath "$entryPointUriPath" with additional permission group names "$permissionGroupNames" to a resource access key "$formattedResourceAccessKey" and "$formattedResourceAccessKeyAdditionalNames"',
  ({
    entryPointUriPath,
    formattedResourceAccessKey,
    permissionGroupNames,
    formattedResourceAccessKeyAdditionalNames,
  }) => {
    it(`should format correctly`, () => {
      const [, additionalPermissionKey] = Boolean(formattedResourceAccessKey)
        ? formattedResourceAccessKeyAdditionalNames.split(
            formattedResourceAccessKey
          )
        : ['', formattedResourceAccessKeyAdditionalNames];

      expect(
        entryPointUriPathToPermissionKeys(
          entryPointUriPath,
          permissionGroupNames
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
      const permissionKeys = entryPointUriPathToPermissionKeys(
        internalApplicationGroup
      );
      expect(permissionKeys.View).toBe(`View${formattedResourceAccessKey}`);
      expect(permissionKeys.Manage).toBe(`Manage${formattedResourceAccessKey}`);
    });
  }
);

describe.each`
  permissionGroupNames | formattedResourceAccessKeyAdditionalName
  ${undefined}         | ${''}
  ${['books']}         | ${'Books'}
  ${['the-books']}     | ${'TheBooks'}
  ${['the-movies']}    | ${'TheMovies'}
`(
  'resolving Custom Views  resource accesses',
  ({ permissionGroupNames, formattedResourceAccessKeyAdditionalName }) => {
    it(`should format correctly`, () => {
      expect(resolveCustomViewResourceAccesses(permissionGroupNames)).toEqual({
        view: `view`,
        manage: `manage`,
        [`view${formattedResourceAccessKeyAdditionalName}`]: `view${formattedResourceAccessKeyAdditionalName}`,
        [`manage${formattedResourceAccessKeyAdditionalName}`]: `manage${formattedResourceAccessKeyAdditionalName}`,
      });
    });
  }
);
