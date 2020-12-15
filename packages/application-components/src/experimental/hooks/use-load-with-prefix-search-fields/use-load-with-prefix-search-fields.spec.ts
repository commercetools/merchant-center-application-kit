import { getPrefixSearchWherePredicate } from './use-load-with-prefix-search-fields';

describe('getPrefixSearchWherePredicate', () => {
  it.each`
    prefixSearchFields                       | inputValue | predicate
    ${['name.en', 'key']}                    | ${'s'}     | ${'name(en >= "s" and en < "t") or key >= "s" and key < "t"'}
    ${['masterData.current.name.en', 'key']} | ${'s'}     | ${'masterData(current(name(en >= "s" and en < "t"))) or key >= "s" and key < "t"'}
    ${['name.en']}                           | ${'s'}     | ${'name(en >= "s" and en < "t")'}
    ${['key']}                               | ${'s'}     | ${'key >= "s" and key < "t"'}
  `(
    'should load options with prefix search using $prefixSearchFields search fields',
    ({ prefixSearchFields, inputValue, predicate }) => {
      expect(
        getPrefixSearchWherePredicate(inputValue, prefixSearchFields)
      ).toBe(predicate);
    }
  );
});
