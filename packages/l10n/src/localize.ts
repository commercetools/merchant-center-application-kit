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
 * Given a list of localized field names to map, replace the fields in the
 * format of `LocalizedField` to a `LocalizedString` object.
 * The existing "localized" fields (the list version) will be removed.
 *
 * @param objectWithLocalizedFields
 * the object with `LocalizedField` fields
 * that need to be transformed into `LocalizedStrings`
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
  if (!entity || !entity[key] || !locale) return fallback;
  const localizedString = entity[key] as LocalizedString;
  if (localizedString[locale]) return localizedString[locale];
  // see if we can fallback to the primary locale, eg. de for de-AT
  const primaryLocale = locale && getPrimaryLocale(locale);
  if (localizedString[primaryLocale]) return localizedString[primaryLocale];
  const fallbackLanguage = findFallbackLocale(localizedString, fallbackOrder);
  return fallbackLanguage
    ? formatLocalizedFallbackHint(
        localizedString[fallbackLanguage],
        fallbackLanguage
      )
    : fallback;
};
