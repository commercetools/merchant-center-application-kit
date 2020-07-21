import shallowlyCoerceValues from './coerce-values';
import coerceValuesJson from './fixtures/coerce-values.json';

describe('given a JSON with stringified values', () => {
  it('should coerce values into their primitives', () => {
    const result = shallowlyCoerceValues(coerceValuesJson);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "array": Array [
          "1",
          "2",
        ],
        "arrayWithDoubleEscapedQuotes": Array [
          "1",
          "2",
        ],
        "bool": true,
        "empty": "",
        "emptyArray": Array [],
        "null": null,
        "number": 1,
        "string": "foo",
      }
    `);
  });
});
