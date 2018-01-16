import { unwrapError } from './setup-global-error-listener';

describe('unwrapping an error', () => {
  describe('with event', () => {
    let event;

    beforeEach(() => {
      event = {
        error: 'foo-error',
      };
    });

    it('should return the error', () => {
      expect(unwrapError(event)).toEqual(event.error);
    });
  });

  describe('with message', () => {
    let message;

    beforeEach(() => {
      message = 'foo-message';
    });

    it('should return the message', () => {
      expect(unwrapError(message)).toEqual(message);
    });
  });

  describe('with any object', () => {
    let object;

    beforeEach(() => {
      object = {
        some: 'property',
      };
    });

    it('should return the object', () => {
      expect(unwrapError(object)).toEqual(object);
    });
  });

  describe('without error and message', () => {
    it('should return the message', () => {
      expect(unwrapError(undefined)).toEqual(new Error('unknown-error'));
    });
  });
});
