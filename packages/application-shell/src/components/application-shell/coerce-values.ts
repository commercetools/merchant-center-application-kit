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
  try {
    // Strip out escaped quotes. This is mostly important to coerce an array of string
    // with escaped quotes.
    return JSON.parse(String(environmentValueAsString).replace(/(\\")/g, '"'));
  } catch (e) {
    return environmentValueAsString;
  }
};

type ShallowJson = { [key: string]: unknown };
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

export default shallowlyCoerceValues;
