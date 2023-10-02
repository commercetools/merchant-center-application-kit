import selectProjectKeyFromUrl from '../select-project-key-from-url';
import getCorrelationId from './get-correlation-id';

jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));
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
  });

  describe('with malformed `userId`', () => {
    beforeEach(() => {
      correlationId = getCorrelationId({ userId: ':::' });
    });

    it('should not include userId in correlationId', () => {
      expect(correlationId).toBe('mc/test-project-key/test-uuid');
    });
  });

  describe('without `userId`', () => {
    beforeEach(() => {
      correlationId = getCorrelationId();
    });

    it('should build correlation id', () => {
      expect(correlationId).toBe('mc/test-project-key/test-uuid');
    });
  });

  describe('with malformed `projectKey`', () => {
    beforeEach(() => {
      selectProjectKeyFromUrl.mockImplementation(() => ':::');
      correlationId = getCorrelationId({ userId: 'user-1' });
    });

    it('should not include projectKey in correlationId', () => {
      expect(correlationId).toBe('mc/user-1/test-uuid');
    });
  });
});
