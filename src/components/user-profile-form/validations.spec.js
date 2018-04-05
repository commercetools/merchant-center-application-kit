import { validate } from './validations';

describe('validate', () => {
  describe('on `firstName`', () => {
    describe('when the first name is missing', () => {
      it('should mark that as an error', () => {
        expect(validate({ firstName: '', lastName: 'Foo' }).firstName).toEqual({
          required: true,
        });
      });
    });
  });

  describe('on `lastName`', () => {
    describe('when the last name is missing', () => {
      it('should mark that as an error', () => {
        expect(validate({ firstName: 'Foo', lastName: '' }).lastName).toEqual({
          required: true,
        });
      });
    });
  });
});
