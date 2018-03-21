import { validate } from './validations';

describe('validate', () => {
  describe('when the first name is missing', () => {
    it('should mark that as an error', () => {
      expect(validate({ firstName: '', lastName: 'Foo' })).toEqual({
        firstNameMissing: true,
      });
    });
  });
  describe('when the last name is missing', () => {
    it('should mark that as an error', () => {
      expect(validate({ firstName: 'Foo', lastName: '' })).toEqual({
        lastNameMissing: true,
      });
    });
  });
});
