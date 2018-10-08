import { ACTIVATE_PLUGIN } from './constants';
import reducer from './reducer';

describe('initial state', () => {
  it('should return null', () => {
    expect(reducer()).toBe(null);
  });
});

describe('actions', () => {
  let state;
  let action;
  describe('ACTIVATE_PLUGIN', () => {
    beforeEach(() => {
      state = [1];
      action = { type: ACTIVATE_PLUGIN, payload: 'mcng-foo' };
    });
    it('should return the plugin name', () => {
      expect(reducer(state, action)).toBe('mcng-foo');
    });
  });
});
