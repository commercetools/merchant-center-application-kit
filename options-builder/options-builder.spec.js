import OptionsBuilder from './options-builder';

describe('constructor', () => {
  let builder;
  const defaultOptions = { foo: true };
  beforeEach(() => {
    builder = new OptionsBuilder(defaultOptions);
  });
  it('accepts default options', () => {
    expect(builder.get()).toBe(defaultOptions);
  });
});

describe('api', () => {
  let builder;
  beforeEach(() => {
    builder = new OptionsBuilder();
  });

  describe('`get`', () => {
    it('returns the options', () => {
      expect(builder.get()).toEqual({});
    });
  });

  describe('when calling `staged`', () => {
    let result;
    beforeEach(() => {
      result = builder.staged(true);
    });
    it('it adds `useStaged`', () => {
      expect(builder.get()).toEqual({ useStaged: true });
    });
    it('returns the OptionsBuilder instance', () => {
      expect(result).toBeInstanceOf(OptionsBuilder);
    });
  });

  describe('when calling `page`', () => {
    let result;
    beforeEach(() => {
      result = builder.page(2);
    });
    it('it adds the provided page', () => {
      expect(builder.get()).toEqual({ page: 2 });
    });
    it('returns the OptionsBuilder instance', () => {
      expect(result).toBeInstanceOf(OptionsBuilder);
    });
  });

  describe('when calling `perPage`', () => {
    let result;
    beforeEach(() => {
      result = builder.perPage(2);
    });
    it('it adds the provided perPage', () => {
      expect(builder.get()).toEqual({ perPage: 2 });
    });
    it('returns the OptionsBuilder instance', () => {
      expect(result).toBeInstanceOf(OptionsBuilder);
    });
  });

  describe('when calling `text`', () => {
    let result;
    beforeEach(() => {
      result = builder.text('some-text', 'en');
    });
    it('it adds the provided text', () => {
      expect(builder.get()).toEqual({
        text: { term: 'some-text', language: 'en' },
      });
    });
    it('returns the OptionsBuilder instance', () => {
      expect(result).toBeInstanceOf(OptionsBuilder);
    });
  });

  describe('when calling `filterByQuery`', () => {
    describe('when there was no `filterByQuery` before', () => {
      let result;
      beforeEach(() => {
        result = builder.filterByQuery('some-query');
      });
      it('it adds the provided filterByQuery', () => {
        expect(builder.get()).toEqual({
          filterByQuery: ['some-query'],
        });
      });
      it('returns the OptionsBuilder instance', () => {
        expect(result).toBeInstanceOf(OptionsBuilder);
      });
    });
    describe('when a `filterByQuery` already exists', () => {
      let result;
      beforeEach(() => {
        builder.filterByQuery('existing-query');
        result = builder.filterByQuery('added-query');
      });
      it('it adds the provided filterByQuery', () => {
        expect(builder.get()).toEqual({
          filterByQuery: ['existing-query', 'added-query'],
        });
      });
      it('returns the OptionsBuilder instance', () => {
        expect(result).toBeInstanceOf(OptionsBuilder);
      });
    });
  });
  describe('when calling `sort`', () => {
    let result;
    beforeEach(() => {
      result = builder.sort('by', true);
    });
    it('it adds the provided sort', () => {
      expect(builder.get()).toEqual({
        sort: { by: 'by', isSortAsc: true },
      });
    });
    it('returns the OptionsBuilder instance', () => {
      expect(result).toBeInstanceOf(OptionsBuilder);
    });
  });
  describe('when calling `where`', () => {
    describe('when there were no `where` predicates before', () => {
      describe('when called with a single predicate', () => {
        let result;
        beforeEach(() => {
          result = builder.where('some-predicate');
        });
        it('it adds the provided where', () => {
          expect(builder.get()).toEqual({
            where: ['some-predicate'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
      describe('when called with multiple predicates', () => {
        let result;
        beforeEach(() => {
          result = builder.where(['some-predicate', 'some-other-predicate']);
        });
        it('it adds the provided where', () => {
          expect(builder.get()).toEqual({
            where: ['some-predicate', 'some-other-predicate'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
    });
    describe('when a `where` predicate already exists', () => {
      describe('when called with a single predicate', () => {
        let result;
        beforeEach(() => {
          builder.where('existing-predicate');
          result = builder.where('added-predicate');
        });
        it('it adds the provided where', () => {
          expect(builder.get()).toEqual({
            where: ['existing-predicate', 'added-predicate'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
      describe('when called with multiple predicates', () => {
        let result;
        beforeEach(() => {
          builder.where('existing-predicate');
          result = builder.where(['some-predicate', 'some-other-predicate']);
        });
        it('it adds the provided where', () => {
          expect(builder.get()).toEqual({
            where: [
              'existing-predicate',
              'some-predicate',
              'some-other-predicate',
            ],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
    });
  });
  describe('when calling `expand`', () => {
    describe('when there were no `expand` expansions before', () => {
      describe('when called with a single expansion', () => {
        let result;
        beforeEach(() => {
          result = builder.expand('some-expansion');
        });
        it('it adds the provided expand', () => {
          expect(builder.get()).toEqual({
            expand: ['some-expansion'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
      describe('when called with multiple expansions', () => {
        let result;
        beforeEach(() => {
          result = builder.expand(['some-expansion', 'some-other-expansion']);
        });
        it('it adds the provided expand', () => {
          expect(builder.get()).toEqual({
            expand: ['some-expansion', 'some-other-expansion'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
    });
    describe('when a `expand` expansion already exists', () => {
      describe('when called with a single expansion', () => {
        let result;
        beforeEach(() => {
          builder.expand('existing-expansion');
          result = builder.expand('added-expansion');
        });
        it('it adds the provided expand', () => {
          expect(builder.get()).toEqual({
            expand: ['existing-expansion', 'added-expansion'],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
      describe('when called with multiple expansions', () => {
        let result;
        beforeEach(() => {
          builder.expand('existing-expansion');
          result = builder.expand(['some-expansion', 'some-other-expansion']);
        });
        it('it adds the provided expand', () => {
          expect(builder.get()).toEqual({
            expand: [
              'existing-expansion',
              'some-expansion',
              'some-other-expansion',
            ],
          });
        });
        it('returns the OptionsBuilder instance', () => {
          expect(result).toBeInstanceOf(OptionsBuilder);
        });
      });
    });
  });
});
