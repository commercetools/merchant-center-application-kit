import { renderHook } from '@testing-library/react-hooks';
import coerceValuesJson from './fixtures/coerce-values.json';
import useCoercedEnvironmentValues from './use-coerced-environment-values';

describe('given a JSON with stringified values', () => {
  it('should coerce values into their primitives', () => {
    const { result } = renderHook(() =>
      useCoercedEnvironmentValues(coerceValuesJson)
    );
    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "arrayAsString": Array [
          "1",
          "2",
        ],
        "arrayAsStringWithDoubleEscapedQuotes": Array [
          "1",
          "2",
        ],
        "arrayOfNumbers": Array [
          1,
          2,
          3,
        ],
        "arrayOfStrings": Array [
          "hello",
          "world",
        ],
        "bool": true,
        "boolAsString": true,
        "empty": "",
        "emptyArrayAsString": Array [],
        "null": null,
        "nullAsString": null,
        "number": 1,
        "numberAsString": 1,
        "string": "foo",
      }
    `);
  });
});
