import {
  isNotificationVisible,
  NotificationsFaC,
} from './notifications-connector';

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

describe('NotificationsFaC', () => {
  let props;
  const createTestProps = custom => ({
    children: jest.fn(),
    notifications: ['foo', 'bar'],
    showNotification: jest.fn(),
    showApiErrorNotification: jest.fn(),
    showUnexpectedErrorNotification: jest.fn(),
    ...custom,
  });
  beforeEach(() => {
    props = createTestProps();
    NotificationsFaC(props);
  });
  it('should call the children prop', () => {
    expect(props.children).toHaveBeenCalledTimes(1);
  });
  it('should pass notifications', () => {
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        notifications: props.notifications,
      })
    );
  });
  it('should pass showNotification', () => {
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        showNotification: props.showNotification,
      })
    );
  });
  it('should pass showApiErrorNotification', () => {
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        showApiErrorNotification: props.showApiErrorNotification,
      })
    );
  });
  it('should pass showUnexpectedErrorNotification', () => {
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        showUnexpectedErrorNotification: props.showUnexpectedErrorNotification,
      })
    );
  });
});
