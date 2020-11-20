import omit from 'lodash/omit';

type TLocalizedField = {
  locale: string;
  value: string;
};

type TLocalizedString = {
  [key: string]: string;
};

type TFieldNameTranformationMapping = {
  from: string;
  to: string;
};

/**
 * Transforms a list of `LocalizedField` into a `LocalizedString` object
 * [{ locale: 'sv', value: 'Hej' }] -> { sv: 'Hej' }
 */
export const transformLocalizedFieldToLocalizedString = (
  localizedFields?: TLocalizedField[]
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
export const applyTransformedLocalizedFields = <
  Input extends Record<string, unknown>,
  Output extends Record<string, unknown>
>(
  objectWithLocalizedFields: Input,
  fieldNames: TFieldNameTranformationMapping[]
): Output => {
  const transformedFieldDefinitions = fieldNames.reduce(
    (nextTransformed, fieldName) => ({
      ...nextTransformed,
      [fieldName.to]: transformLocalizedFieldToLocalizedString(
        objectWithLocalizedFields[fieldName.from] as
          | TLocalizedField[]
          | undefined
      ),
    }),
    {}
  );
  const namesToOmit = fieldNames.reduce<{ [key: string]: string }>(
    (nextKeysToOmit, field) => ({
      ...nextKeysToOmit,
      [field.from]: field.from,
    }),
    {}
  );
  const objectWithoutLocalizedFields = omit<Input>(
    objectWithLocalizedFields,
    Object.keys(namesToOmit)
  );
  return {
    ...objectWithoutLocalizedFields,
    ...transformedFieldDefinitions,
  } as Output;
};
