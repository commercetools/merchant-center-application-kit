import { isNotificationVisible } from './notifications-connector';

describe('isNotificationVisible', () => {
  describe('when no plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible(null, null)).toBe(true);
    });
    it('should hide plugin notifications', () => {
      expect(isNotificationVisible(null, 'non-active-plugin')).toBe(false);
    });
  });
  describe('when a plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible('active-plugin', null)).toBe(true);
    });
    it('should hide notifications from other plugins', () => {
      expect(isNotificationVisible('active-plugin', 'non-active-plugin')).toBe(
        false
      );
    });
    it('should show notifications from the active plugin', () => {
      expect(isNotificationVisible('active-plugin', 'active-plugin')).toBe(
        true
      );
    });
  });
});
