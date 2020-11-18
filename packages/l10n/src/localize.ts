import omit from 'lodash.omit';

type TLocalizedField = {
  locale: string;
  value: string;
};

type TLocalizedString = {
  [key: string]: string;
};

type TFieldNameTranformationDefinition = {
  from: string;
  to: string;
};

type TRecordOfLocalizedString = Record<string, TLocalizedString | null>;
type TObjectContainsLocalizedString = Partial<TRecordOfLocalizedString>;

/**
 * Transforms a list of `LocalizedField` into a `LocalizedString` object
 * [{ locale: 'sv', value: 'Hej' }] -> { sv: 'Hej' }
 */
export const transformLocalizedFieldToString = (
  localizedFields?: TLocalizedField[] | null
): TLocalizedString | null => {
  if (!localizedFields || localizedFields.length === 0) return null;
  return localizedFields.reduce(
    (nextLocalizedString, field) => ({
      ...nextLocalizedString,
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
export const injectTransformedLocalizedFields = <
  T extends Record<string, TLocalizedField[] | unknown>
>(
  objectWithLocalizedFields: T,
  fieldNames: TFieldNameTranformationDefinition[]
): TObjectContainsLocalizedString => {
  const transformedFieldDefinitions: TRecordOfLocalizedString = fieldNames.reduce(
    (nextTransformed, fieldName): TRecordOfLocalizedString => ({
      ...nextTransformed,
      [fieldName.to]: transformLocalizedFieldToString(
        objectWithLocalizedFields[fieldName.from] as TLocalizedField[]
      ),
    }),
    {}
  );
  const objectWithoutLocalizedFields: Partial<Record<keyof T, unknown>> = omit(
    objectWithLocalizedFields,
    fieldNames.map((field) => field.from)
  );
  return {
    ...objectWithoutLocalizedFields,
    ...transformedFieldDefinitions,
  };
};
