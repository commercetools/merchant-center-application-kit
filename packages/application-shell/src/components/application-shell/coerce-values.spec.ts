import shallowlyCoerceValues from './coerce-values';
import coerceValuesJson from './fixtures/coerce-values.json';

describe('given a JSON with stringified values', () => {
  it('should coerce values into their primitives', () => {
    const result = shallowlyCoerceValues(coerceValuesJson);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "array": Array [
          "hello",
          "world",
        ],
        "arrayAsString": Array [
          "1",
          "2",
        ],
        "arrayAsStringWithDoubleEscapedQuotes": Array [
          "1",
          "2",
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
