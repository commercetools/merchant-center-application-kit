import omit from 'lodash/omit';
import {
  LocalizedString,
  LocalizedField,
  FieldNameTranformationMapping,
  FormatLocalizedStringOptions,
} from './types';
import {
  getPrimaryLocale,
  findFallbackLocale,
  formatLocalizedFallbackHint,
} from './utils';

/**
 * Transforms a list of `LocalizedField` into a `LocalizedString` object
 * [{ locale: 'sv', value: 'Hej' }] -> { sv: 'Hej' }
 */
export const transformLocalizedFieldToLocalizedString = (
  localizedFields?: LocalizedField[]
): LocalizedString | null => {
  if (!localizedFields || localizedFields.length === 0) return null;
  return localizedFields.reduce(
    (nexLocalizedString, field) => ({
      ...nexLocalizedString,
      [field.locale]: field.value,
    }),
    {}
  );
};

/**
 * Transforms a `LocalizedString` object into a list of `LocalizedField`
 *
 * { sv: 'Hej' } -> [{ locale: 'sv', value: 'Hej' }]
 */
export const transformLocalizedStringToLocalizedField = (
  localizedString?: LocalizedString
): LocalizedField[] => {
  if (!localizedString || Object.keys(localizedString).length === 0) return [];
  const sorted = Object.keys(localizedString).sort();
  return sorted.reduce<LocalizedField[]>(
    (updatedLocalizedField, locale) => [
      ...updatedLocalizedField,
      {
        locale,
        value: localizedString[locale],
      },
    ],
    []
  );
};

/**
 * Given a list of localized field names to map, replace the fields in the
 * format of `LocalizedField` to a `LocalizedString` object.
 * The existing "localized" fields (the list version) will be removed.
 *
 * @param objectWithLocalizedFields
 * the object with `LocalizedField` fields
 * that need to be transformed into `LocalizedString`s
 * @param fieldNames
 * An array of objects with following shape:
 *   * `from`: the field to transform and to remove after
 *   * `to`: the target field to write the transformed shape
 */
export const applyTransformedLocalizedFields = <
  Input extends Record<string, unknown>,
  Output extends Record<string, unknown>
>(
  objectWithLocalizedFields: Input,
  fieldNames: FieldNameTranformationMapping[]
): Output => {
  const transformedFieldDefinitions = fieldNames.reduce(
    (nextTransformed, fieldName) => ({
      ...nextTransformed,
      [fieldName.to]: transformLocalizedFieldToLocalizedString(
        objectWithLocalizedFields[fieldName.from] as
          | LocalizedField[]
          | undefined
      ),
    }),
    {}
  );
  const namesToOmit = fieldNames.map((fieldName) => fieldName.from);
  const objectWithouLocalizedFields = omit<Input>(
    objectWithLocalizedFields,
    namesToOmit
  );
  return {
    ...objectWithouLocalizedFields,
    ...transformedFieldDefinitions,
  } as Output;
};

/**
 * Given a list of localized string names to map, replace the fields in the
 * format of `LocalizedString` to a `LocalizedField` object.
 * The existing "localized" strings (the list version) will be removed.
 *
 * @param objectWithLocalizedStrings
 * the object with `LocalizedString` fields
 * that need to be transformed into `LocalizedField`s
 * @param fieldNames
 * An array of objects with following shape:
 *   * `from`: the field to transform and to remove after
 *   * `to`: the target field to write the transformed shape
 */
export const applyTransformedLocalizedStrings = <
  Input extends Record<string, unknown>,
  Output extends Record<string, unknown>
>(
  objectWithLocalizedStrings: Input,
  fieldNames: FieldNameTranformationMapping[]
): Output => {
  const transformedFieldDefinitions = fieldNames.reduce(
    (nextTransformed, fieldName) => ({
      ...nextTransformed,
      [fieldName.to]: transformLocalizedStringToLocalizedField(
        objectWithLocalizedStrings[fieldName.from] as LocalizedString
      ),
    }),
    {}
  );
  const namesToOmit = fieldNames.map((fieldName) => fieldName.from);
  const objectWithouLocalizedFields = omit<Input>(
    objectWithLocalizedStrings,
    namesToOmit
  );
  return {
    ...objectWithouLocalizedFields,
    ...transformedFieldDefinitions,
  } as Output;
};

/**
 * Translates a localized string on an entity.
 *
 * The `localize` function receives a complete entity that can have several
 * localized fields.
 *
 * Arguments
 *  - `obj`: that entity
 *  - `key`: the field within `obj` that might contain a localized strings
 *  - `locale`: the language key that should be the first choice to show
 *  - `fallbackOrder`: an array of language keys which will be tried in the
 *     provided order for any set value
 *  - `fallback`: the final fallback that should be displayed as a last resort.
 *     This fallback will also be shown in case the field does not exist on the
 *     provided object.
 *
 * Before `fallback` kicks in, the following is tried to display a meaningful value:
 *  - if `locale` is `<language>-<extlang>`, eg. `de-AT`, try if `de` is set
 *  - if not, iterate through all languages of project-settings
 *    (passed as `fallbackOrder`) and pick the first one with a value
 *  - if nothing is found, go through all the languages in provided localized
 *    string an pick the first with a value
 *  - if still no value is found display `fallback`
 *
 * NOTE: It is known that this might lead to strings displayed in different
 *       languages within the same page. This is an accepted downside.
 *
 * NOTE: A missing field is treated like a localied string with no translations:
 *       let a = formatLocalizedString({ name: { en: '', de: '' } }, { locale: 'en' })
 *       let b = formatLocalizedString({}, { locale: 'en' })
 *       let c = formatLocalizedString(undefined, { locale: 'en' })
 *       a === b && a === c -> true
 */
export const formatLocalizedString = <Input extends Record<string, unknown>>(
  entity: Input | null,
  {
    key = '',
    locale,
    fallbackOrder = [],
    fallback = '',
  }: FormatLocalizedStringOptions<Input>
): string => {
  if (!entity || !entity[key]) return fallback;
  const localizedString = entity[key] as LocalizedString;
  const fallbackLocale = findFallbackLocale(localizedString, fallbackOrder);

  const formattedLocalizedFallback = fallbackLocale
    ? formatLocalizedFallbackHint(
        localizedString[fallbackLocale],
        fallbackLocale
      )
    : fallback;

  // GIVEN no `locale`
  // THEN return formattedFallback by fallbackOrder
  if (!locale) return formattedLocalizedFallback;

  // GIVEN locale
  // AND there is a value on `localizedString`
  // THEN return value
  if (localizedString[locale]) return localizedString[locale];

  // GIVEN locale
  // AND there is a value on primary locale
  // THEN return value on primary locale
  const primaryLocale = locale && getPrimaryLocale(locale);
  if (localizedString[primaryLocale]) return localizedString[primaryLocale];

  // use formattedFallback by fallbackOrder as last resort
  return formattedLocalizedFallback;
};
