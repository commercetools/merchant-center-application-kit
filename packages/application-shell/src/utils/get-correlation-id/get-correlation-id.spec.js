import selectProjectKeyFromUrl from '../select-project-key-from-url';
import getCorrelationId from './get-correlation-id';

jest.mock('uuid/v4', () => () => 'test-uuid');
jest.mock('../select-project-key-from-url', () =>
  jest.fn(() => 'test-project-key')
);

describe('getCorrelationId', () => {
  let correlationId;

  beforeEach(() => {
    correlationId = getCorrelationId();
  });

  it('should invoke `selectProjectKeyFromUrl`', () => {
    expect(selectProjectKeyFromUrl).toHaveBeenCalled();
  });

  describe('with `userId`', () => {
    beforeEach(() => {
      correlationId = getCorrelationId({ userId: 'user-1' });
    });

    it('should build correlation id', () => {
      expect(correlationId).toBe('mc/test-project-key/user-1/test-uuid');
    });

    it('should not contain `null`', () => {
      // NOTE: `'null'` would be stringified.
      expect(correlationId).not.toEqual(expect.stringContaining('null'));
    });
  });

  describe('without `userId`', () => {
    beforeEach(() => {
      correlationId = getCorrelationId();
    });

    it('should build correlation id', () => {
      expect(correlationId).toBe('mc/test-project-key/test-uuid');
    });

    it('should not contain `null`', () => {
      // NOTE: `'null'` would be stringified.
      expect(correlationId).not.toEqual(expect.stringContaining('null'));
    });
  });
});
