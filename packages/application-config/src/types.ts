import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { CLOUD_IDENTIFIERS } from './constants';

export type ConfigOptions = JSONSchemaForCustomApplicationConfigurationFiles;

export type CloudIdentifier =
  typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

type LocalizedFieldData = {
  locale: string;
  value: string;
};
type CustomApplicationPermissionData = {
  name: string;
  oAuthScopes: string[];
};
type CustomApplicationMenuLinkData = {
  defaultLabel: string;
  labelAllLocales: LocalizedFieldData[];
  permissions: string[];
};
type CustomApplicationSubmenuLinkData = {
  uriPath: string;
  defaultLabel: string;
  labelAllLocales: LocalizedFieldData[];
  permissions: string[];
};
export type CustomApplicationData = {
  id: string;
  entryPointUriPath: string;
  name: string;
  description?: string;
  url: string;
  icon: string;
  permissions: CustomApplicationPermissionData[];
  mainMenuLink: CustomApplicationMenuLinkData;
  submenuLinks: CustomApplicationSubmenuLinkData[];
};

// The object result after processing the config file
export type ApplicationRuntimeConfig<
  AdditionalEnvironmentProperties extends {} = {}
> = {
  data: CustomApplicationData;
  env: AdditionalEnvironmentProperties & ApplicationWindow['app'];
  headers: JSONSchemaForCustomApplicationConfigurationFiles['headers'];
};

export type LoadingConfigOptions = {
  processEnv: NodeJS.ProcessEnv;
  applicationPath: string;
};

// Utility types
export type WordSeparators = '-';

/**
Represents an array of strings split using a given character or character set.

source: https://github.com/sindresorhus/type-fest/blob/fedbc441a314c1f9f5f6225c993860d0886261da/source/split.d.ts#L22:L29

@example
```
declare function split<S extends string, D extends string>(string: S, separator: D): Split<S, D>;
type Item = 'foo' | 'bar' | 'baz' | 'waldo';
const items = 'foo,bar,baz,waldo';
let array: Item[];
array = split(items, ',');
```
*/
export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Lowercase<Head>, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

/**
Step by step takes the first item in an array literal, formats it and adds it to a string literal, and then recursively appends the remainder.
Only to be used by `CamelCaseStringArray<>`.

source: https://github.com/sindresorhus/type-fest/blob/fedbc441a314c1f9f5f6225c993860d0886261da/source/camel-case.d.ts#L11:L18
*/
type InnerCamelCaseStringArray<
  Parts extends readonly unknown[],
  PreviousPart
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? FirstPart extends undefined
    ? ''
    : FirstPart extends ''
    ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
    : `${PreviousPart extends ''
        ? FirstPart
        : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
        RemainingParts,
        FirstPart
      >}`
  : '';

/**
Starts fusing the output of `Split<>`, an array literal of strings, into a camel-cased string literal.
It's separate from `InnerCamelCaseStringArray<>` to keep a clean API outwards to the rest of the code.

source: https://github.com/sindresorhus/type-fest/blob/fedbc441a314c1f9f5f6225c993860d0886261da/source/camel-case.d.ts#L27:L30
*/
type CamelCaseStringArray<Parts extends readonly string[]> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts
]
  ? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<
      RemainingParts,
      FirstPart
    >}`>
  : never;

/**
Convert a string literal to camel-case.
This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result.

source: https://github.com/sindresorhus/type-fest/blob/fedbc441a314c1f9f5f6225c993860d0886261da/source/camel-case.d.ts#L73

@example
```
const someVariable: CamelCase<'foo-bar'> = 'fooBar';
const anotherVariable: CamelCase<'foo_bar'> = 'foo_Bar';
```
*/
export type CamelCase<K> = K extends string
  ? CamelCaseStringArray<
      Split<K extends Uppercase<K> ? Uppercase<K> : K, WordSeparators>
    >
  : K;
