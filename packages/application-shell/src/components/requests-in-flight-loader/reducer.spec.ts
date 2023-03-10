import type { Action } from 'redux';

import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import reducer from './reducer';
import type {
  TShowRequestInFlightAction,
  THideRequestInFlightAction,
} from './types';

jest.mock('@commercetools-frontend/sentry');

describe('initial state', () => {
  it('should return empty array', () => {
    expect(reducer()).toEqual([]);
  });
});

describe('actions', () => {
  let state: string[];
  describe('SHOW_LOADING', () => {
    let action: TShowRequestInFlightAction;
    beforeEach(() => {
      state = ['one'];
      action = { type: SHOW_LOADING, payload: 'two' };
    });
    it('should append an entry to the list', () => {
      expect(reducer(state, action)).toEqual(['one', 'two']);
    });
  });
  describe('HIDE_LOADING', () => {
    let action: THideRequestInFlightAction;
    describe('if the list contains the given payload', () => {
      beforeEach(() => {
        state = ['one', 'two', 'three', 'two'];
        action = { type: HIDE_LOADING, payload: 'two' };
      });
      it('should remove the first occurrence in the list', () => {
        expect(reducer(state, action)).toEqual(['one', 'three', 'two']);
      });
    });
    describe('when the list does not contain the given payload', () => {
      beforeEach(() => {
        state = ['one', 'two'];
        action = { type: HIDE_LOADING, payload: 'five' };
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
    let action: Action<'FOO'>;
    beforeEach(() => {
      state = ['one', 'two'];
      action = { type: 'FOO' };
    });
    it('should return the reference to the existing state', () => {
      expect(reducer(state, action)).toBe(state);
    });
  });
});
