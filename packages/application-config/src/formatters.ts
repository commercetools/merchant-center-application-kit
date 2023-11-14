import upperFirst from 'lodash/upperFirst';
import { CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH } from '@commercetools-frontend/constants';
import type { CamelCase } from './types';

type TImplicitCustomApplicationResourceAccesses<
  PermissionGroupName extends string = ''
> = Record<
  | `view`
  | `manage`
  | `view${Capitalize<CamelCase<PermissionGroupName>>}`
  | `manage${Capitalize<CamelCase<PermissionGroupName>>}`,
  string
>;

type TImplicitCustomViewResourceAccesses<
  PermissionGroupName extends string = ''
> = TImplicitCustomApplicationResourceAccesses<PermissionGroupName>;

type TImplicitCustomApplicationPermissionKeys<
  PermissionGroupName extends string = ''
> = Record<
  | `View`
  | `Manage`
  | `View${Capitalize<CamelCase<PermissionGroupName>>}`
  | `Manage${Capitalize<CamelCase<PermissionGroupName>>}`,
  string
>;

/**
 * The function formats the `entryPointUriPath` to a resource access key.
 * It makes the first character of the string and the next character after a special character an uppercase.
 * It replaces hyphen(-) with a forward slash(/) if the hyphen(-) is followed by a number.
 *
 * @example
 * - avengers --> Avengers
 * - the-avengers --> TheAvengers
 * - the_avengers --> The_Avengers
 * - avengers-01 --> Avengers/01
 * - avengers_01 --> Avengers_01
 */
const formatEntryPointUriPathToResourceAccessKey = (
  entryPointUriPath: string
) =>
  entryPointUriPath
    // Splits the string by underscore.
    .split('_')
    // Uppercase the first character of each word split.
    .map(upperFirst)
    // Join the words by an underscore.
    .join('_')
    // Each word is split by a hyphen.
    .split('-')
    .map((word, i) => {
      // Regex below checking if the character is numeric.
      // If the word after the hyphen is numeric, replace the hyphen with a forward slash.
      // If not, omit the hyphen and uppercase the first character
      if (i > 0 && /^-?\d+$/.test(word[0])) {
        return `/${word}`;
      }
      return upperFirst(word);
    })
    .join('');

/**
 * The function formats the permission group name to a resource access key.
 * It makes the first character of the string and the next character after a special character (`-`) an uppercase.
 *
 * @example
 * - books --> Books
 * - the-books --> TheBooks
 */
const formatPermissionGroupNameToResourceAccessKey = (
  permissionGroupName: string
) =>
  permissionGroupName
    // Each word is split by a hyphen.
    .split('-')
    .map(upperFirst)
    .join('');

function entryPointUriPathToResourceAccesses(
  entryPointUriPath: string
): TImplicitCustomApplicationResourceAccesses<''>;
function entryPointUriPathToResourceAccesses<
  PermissionGroupName extends string
>(
  entryPointUriPath: string,
  permissionGroupNames: PermissionGroupName[]
): TImplicitCustomApplicationResourceAccesses<PermissionGroupName>;
function entryPointUriPathToResourceAccesses<
  PermissionGroupName extends string
>(
  entryPointUriPath: string,
  permissionGroupNames?: PermissionGroupName[]
): TImplicitCustomApplicationResourceAccesses<PermissionGroupName> {
  const resourceAccessKey =
    CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH === entryPointUriPath
      ? ''
      : formatEntryPointUriPathToResourceAccessKey(entryPointUriPath);

  const defaultResourceAccesses = {
    view: `view${resourceAccessKey}`,
    manage: `manage${resourceAccessKey}`,
  } as TImplicitCustomApplicationResourceAccesses<PermissionGroupName>;

  const additionalResourceAccesses = (permissionGroupNames ?? []).reduce(
    (resourceAccesses, permissionGroupName) => {
      const additionalResourceAccessKey =
        formatPermissionGroupNameToResourceAccessKey(permissionGroupName);
      return {
        ...resourceAccesses,
        [`view${additionalResourceAccessKey}`]: `${defaultResourceAccesses.view}${additionalResourceAccessKey}`,
        [`manage${additionalResourceAccessKey}`]: `${defaultResourceAccesses.manage}${additionalResourceAccessKey}`,
      };
    },
    {} as TImplicitCustomApplicationResourceAccesses<PermissionGroupName>
  );

  return {
    ...defaultResourceAccesses,
    ...additionalResourceAccesses,
  };
}

function computeCustomViewResourceAccesses<PermissionGroupName extends string>(
  permissionGroupNames?: PermissionGroupName[]
): TImplicitCustomViewResourceAccesses<PermissionGroupName> {
  return entryPointUriPathToResourceAccesses(
    CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
    permissionGroupNames || []
  );
}

function computeCustomViewPermissionsKeys<PermissionGroupName extends string>(
  permissionGroupNames?: PermissionGroupName[]
): TImplicitCustomApplicationPermissionKeys<PermissionGroupName> {
  return entryPointUriPathToPermissionKeys(
    CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
    permissionGroupNames || []
  );
}

function entryPointUriPathToPermissionKeys(
  entryPointUriPath: string
): TImplicitCustomApplicationPermissionKeys<''>;
function entryPointUriPathToPermissionKeys<PermissionGroupName extends string>(
  entryPointUriPath: string,
  permissionGroupNames: PermissionGroupName[]
): TImplicitCustomApplicationPermissionKeys<PermissionGroupName>;
function entryPointUriPathToPermissionKeys<PermissionGroupName extends string>(
  entryPointUriPath: string,
  permissionGroupNames?: PermissionGroupName[]
): TImplicitCustomApplicationPermissionKeys<PermissionGroupName> {
  const resourceAccesses =
    entryPointUriPathToResourceAccesses<PermissionGroupName>(
      entryPointUriPath,
      permissionGroupNames ?? []
    );

  return Object.entries(resourceAccesses).reduce(
    (permissionKeys, [resourceAccessKey, resourceAccessValue]) => ({
      ...permissionKeys,
      [upperFirst(resourceAccessKey)]: upperFirst(resourceAccessValue),
    }),
    {} as TImplicitCustomApplicationPermissionKeys<PermissionGroupName>
  );
}

export {
  entryPointUriPathToResourceAccesses,
  entryPointUriPathToPermissionKeys,
  formatEntryPointUriPathToResourceAccessKey,
  formatPermissionGroupNameToResourceAccessKey,
  computeCustomViewResourceAccesses,
  computeCustomViewPermissionsKeys,
};
