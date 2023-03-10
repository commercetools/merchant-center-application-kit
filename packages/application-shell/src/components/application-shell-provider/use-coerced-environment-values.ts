import { useMemo } from 'react';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';

type ShallowJson = { [key: string]: unknown };

/**
 * NOTE:
 *   This function try-catches around a `JSON.parse` and return
 *   the parsed value whenever possible.
 *
 *   This allows parsing most primitive values.
 *
 *   - `JSON.parse('null')` => `null`
 *   - `JSON.parse('1')` => `1`
 *   - `JSON.parse('["a", "b"]')` => `['a', 'b']`
 */
const getCoerceEnvironmentValue = (environmentValueAsString: unknown) => {
  // Return the value as-is if it's not a string.
  if (typeof environmentValueAsString !== 'string') {
    return environmentValueAsString;
  }

  // In case the value is a string, we try to parse it to attempt to extract
  // the primitive value, if the original value is indeed supposed to be a primitive.
  // For example, `'1'` is converted to a number, `'true'` is converted to a boolean, etc.
  try {
    // Strip out escaped quotes. This is mostly important to coerce an array of string
    // with escaped quotes.
    return JSON.parse(String(environmentValueAsString).replace(/(\\")/g, '"'));
  } catch (e) {
    return environmentValueAsString;
  }
};

const shallowlyCoerceValues = (uncoercedEnvironmentValues: ShallowJson) =>
  Object.keys(uncoercedEnvironmentValues).reduce(
    (coercedEnvironmentValues, key) => {
      const uncoercedEnvironmentValue = uncoercedEnvironmentValues[key];
      return {
        ...coercedEnvironmentValues,
        [key]: getCoerceEnvironmentValue(uncoercedEnvironmentValue),
      };
    },
    {}
  );

const useCoercedEnvironmentValues = <
  AdditionalEnvironmentProperties extends {}
>(
  environment: ShallowJson
): TApplicationContext<AdditionalEnvironmentProperties>['environment'] => {
  const coercedEnvironmentValues = useMemo(
    () =>
      shallowlyCoerceValues(
        environment
      ) as TApplicationContext<AdditionalEnvironmentProperties>['environment'],
    [environment]
  );
  return coercedEnvironmentValues;
};

export default useCoercedEnvironmentValues;
