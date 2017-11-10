import {
  addNotification,
  removeNotification,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from 'notifications';

describe('creating add notification actions', () => {
  it('should create an add notification action with no meta data', () => {
    const notification = { foo: 'bar' };
    expect(addNotification(notification)).toEqual({
      type: ADD_NOTIFICATION,
      payload: notification,
    });
  });

  it('should create an add notification action with meta data', () => {
    const notification = { foo: 'bar' };
    expect(addNotification(notification, { domain: 'global' })).toEqual({
      type: ADD_NOTIFICATION,
      payload: notification,
      meta: {
        domain: 'global',
      },
    });
  });
});

describe('creating remove notification actions', () => {
  it('should create a remove notification action by id', () => {
    expect(removeNotification(5)).toEqual({
      type: REMOVE_NOTIFICATION,
      payload: 5,
    });
  });
});
