import { reportErrorToSentry } from '../../utils/sentry';
import reducer from './reducer';

jest.mock('../../utils/sentry');

describe('initial state', () => {
  it('should return empty array', () => {
    expect(reducer()).toEqual([]);
  });
});

describe('actions', () => {
  let state;
  let action;
  describe('SHOW_LOADING', () => {
    beforeEach(() => {
      state = [1];
      action = { type: 'SHOW_LOADING', payload: 2 };
    });
    it('should append an entry to the list', () => {
      expect(reducer(state, action)).toEqual([1, 2]);
    });
  });
  describe('HIDE_LOADING', () => {
    describe('if the list contains the given payload', () => {
      beforeEach(() => {
        state = [1, 2, 3, 2];
        action = { type: 'HIDE_LOADING', payload: 2 };
      });
      it('should remove the first occurrence in the list', () => {
        expect(reducer(state, action)).toEqual([1, 3, 2]);
      });
    });
    describe('when the list does not contain the given payload', () => {
      beforeEach(() => {
        state = [1, 2];
        action = { type: 'HIDE_LOADING', payload: 5 };
      });
      it('should return the reference of the existing state', () => {
        expect(reducer(state, action)).toBe(state);
      });
      it('should report an error', () => {
        expect(reportErrorToSentry).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('when no actions match', () => {
    beforeEach(() => {
      state = [1, 2];
      action = { type: 'FOO' };
    });
    it('should return the reference to the existing state', () => {
      expect(reducer(state, action)).toBe(state);
    });
  });
});
