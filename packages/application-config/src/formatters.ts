import upperFirst from 'lodash/upperFirst';
import type { CamelCase } from './types';

type TImplicitCustomApplicationResourceAccesses<
  PermissionName extends string = ''
> = Record<
  | `view`
  | `manage`
  | `view${Capitalize<CamelCase<PermissionName>>}`
  | `manage${Capitalize<CamelCase<PermissionName>>}`,
  string
>;

type TImplicitCustomApplicationPermissionKeys<
  PermissionName extends string = ''
> = Record<
  | `View`
  | `Manage`
  | `View${Capitalize<CamelCase<PermissionName>>}`
  | `Manage${Capitalize<CamelCase<PermissionName>>}`,
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
 * The function formats the `permissionName` to a resource access key.
 * It makes the first character of the string and the next character after a special character an uppercase.
 *
 * @example
 * - avengers --> Avengers
 * - the-avengers --> TheAvengers
 * - avengers-01 --> Avengers01 [ℹ️ mind the difference here compared to `formatEntryPointUriPathToResourceAccessKey`] */
const formatPermissionNameToResourceAccessKey = (permissionName: string) =>
  permissionName
    // Each word is split by a hyphen.
    .split('-')
    .map(upperFirst)
    .join('');

function entryPointUriPathToResourceAccesses(
  entryPointUriPath: string
): TImplicitCustomApplicationResourceAccesses<''>;
function entryPointUriPathToResourceAccesses<PermissionName extends string>(
  entryPointUriPath: string,
  additionalPermissionNames: PermissionName[]
): TImplicitCustomApplicationResourceAccesses<PermissionName>;
function entryPointUriPathToResourceAccesses<PermissionName extends string>(
  entryPointUriPath: string,
  additionalPermissionNames?: PermissionName[]
): TImplicitCustomApplicationResourceAccesses<PermissionName> {
  const resourceAccessKey =
    formatEntryPointUriPathToResourceAccessKey(entryPointUriPath);

  const defaultResourceAccesses = {
    view: `view${resourceAccessKey}`,
    manage: `manage${resourceAccessKey}`,
  } as TImplicitCustomApplicationResourceAccesses<PermissionName>;

  const additionalResourceAccesses = (additionalPermissionNames ?? []).reduce(
    (resourceAccesses, permissionName) => {
      const additionalResourceAccessKey =
        formatPermissionNameToResourceAccessKey(permissionName);
      return {
        ...resourceAccesses,
        [`view${additionalResourceAccessKey}`]: `${defaultResourceAccesses.view}${additionalResourceAccessKey}`,
        [`manage${additionalResourceAccessKey}`]: `${defaultResourceAccesses.manage}${additionalResourceAccessKey}`,
      };
    },
    {} as TImplicitCustomApplicationResourceAccesses<PermissionName>
  );

  return {
    ...defaultResourceAccesses,
    ...additionalResourceAccesses,
  };
}

function entryPointUriPathToPermissionKeys(
  entryPointUriPath: string
): TImplicitCustomApplicationPermissionKeys<''>;
function entryPointUriPathToPermissionKeys<PermissionName extends string>(
  entryPointUriPath: string,
  additionalPermissionNames: PermissionName[]
): TImplicitCustomApplicationPermissionKeys<PermissionName>;
function entryPointUriPathToPermissionKeys<PermissionName extends string>(
  entryPointUriPath: string,
  additionalPermissionNames?: PermissionName[]
): TImplicitCustomApplicationPermissionKeys<PermissionName> {
  const resourceAccesses = entryPointUriPathToResourceAccesses<PermissionName>(
    entryPointUriPath,
    additionalPermissionNames ?? []
  );
  return Object.entries(resourceAccesses).reduce(
    (permissionKeys, [resourceAccessKey, resourceAccessValue]) => ({
      ...permissionKeys,
      [upperFirst(resourceAccessKey)]: upperFirst(resourceAccessValue),
    }),
    {} as TImplicitCustomApplicationPermissionKeys<PermissionName>
  );
}

export {
  entryPointUriPathToResourceAccesses,
  entryPointUriPathToPermissionKeys,
};
