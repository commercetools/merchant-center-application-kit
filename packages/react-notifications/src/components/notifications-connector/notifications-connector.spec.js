import { NotificationsFaC } from './notifications-connector';

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
  it('should pass notificationsByDomain', () => {
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
