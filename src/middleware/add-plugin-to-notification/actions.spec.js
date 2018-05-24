import { isLocalAction, isGlobalAction } from './actions';
import { __LOCAL, __GLOBAL } from './constants';

describe('isLocalAction', () => {
  describe('when an action is local', () => {
    it('should return true', () => {
      expect(isLocalAction({ type: __LOCAL })).toBe(true);
    });
  });
  describe('when action is not local', () => {
    it('should return false', () => {
      expect(isLocalAction({ type: 'foo' })).toBe(false);
    });
  });
});

describe('isGlobalAction', () => {
  describe('when an action is global', () => {
    it('should return true', () => {
      expect(isGlobalAction({ type: __GLOBAL })).toBe(true);
    });
  });
  describe('when action is not global', () => {
    it('should return false', () => {
      expect(isLocalAction({ type: 'foo' })).toBe(false);
    });
  });
});
