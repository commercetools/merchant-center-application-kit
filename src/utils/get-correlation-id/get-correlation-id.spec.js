import selectProjectKey from '../select-project-key';
import selectUserId from '../select-user-id';
import getCorrelationId from './get-correlation-id';

jest.mock('uuid/v4', () => () => 'test-uuid');
jest.mock('../select-project-key', () => jest.fn(() => 'test-project-key'));
jest.mock('../select-user-id', () => jest.fn(() => 'test-user-id'));

describe('getCorrelationId', () => {
  let correlationId;

  beforeEach(() => {
    correlationId = getCorrelationId();
  });

  it('should match snapshot', () => {
    expect(correlationId).toMatchSnapshot();
  });

  it('should invoke `selectUserId`', () => {
    expect(selectUserId).toHaveBeenCalled();
  });

  it('should invoke `selectProjectKey`', () => {
    expect(selectProjectKey).toHaveBeenCalled();
  });

  describe('without `userId`', () => {
    beforeEach(() => {
      selectUserId.mockReturnValue(null);
      correlationId = getCorrelationId();
    });

    it('should match snapshot', () => {
      expect(correlationId).toMatchSnapshot();
    });

    it('should not contain `null`', () => {
      // NOTE: `'null'` would be stringified.
      expect(correlationId).not.toEqual(expect.stringContaining('null'));
    });
  });
});
