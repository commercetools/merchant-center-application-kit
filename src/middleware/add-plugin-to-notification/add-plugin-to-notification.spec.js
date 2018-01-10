import { ADD_NOTIFICATION } from '@commercetools-local/notifications';
import { __LOCAL, __GLOBAL } from '@commercetools-local/constants';
import addPluginToNotificationMiddleware from './add-plugin-to-notification';

const addPluginToNotification = addPluginToNotificationMiddleware();

describe('when the dispatched action does not contain the plugin info', () => {
  let next;
  let action;
  beforeEach(() => {
    next = jest.fn(() => 'next-result');
    action = {
      type: 'FOO',
      payload: 'bar',
    };
    addPluginToNotification(next)(action);
  });
  it('should bail out and call the next middleware', () => {
    expect(next).toHaveBeenCalledWith({
      type: 'FOO',
      payload: 'bar',
    });
  });
});

describe('when a local action is dispatched', () => {
  describe('when the contained action is "global"', () => {
    describe('when the contained action is of type ADD_NOTIFICATION', () => {
      let next;
      let action;
      beforeEach(() => {
        next = jest.fn(() => 'next-result');
        action = {
          type: __LOCAL,
          meta: { plugin: 'mcng-foo' },
          payload: {
            type: __GLOBAL,
            payload: {
              type: ADD_NOTIFICATION,
              payload: {
                text: 'some-notification',
              },
            },
          },
        };
        addPluginToNotification(next)(action);
      });
      it('should inject the plugin name to the ADD_NOTIFICATION payload', () => {
        expect(next).toHaveBeenCalledWith({
          type: __LOCAL,
          meta: { plugin: 'mcng-foo' },
          payload: {
            type: __GLOBAL,
            payload: {
              type: ADD_NOTIFICATION,
              payload: {
                text: 'some-notification',
                plugin: 'mcng-foo',
              },
            },
          },
        });
      });
    });
    describe('when the contained action is not of type ADD_NOTIFICATION', () => {
      let next;
      let action;
      let result;
      beforeEach(() => {
        next = jest.fn(() => 'next-result');
        action = {
          type: __LOCAL,
          meta: { plugin: 'mcng-foo' },
          payload: {
            type: __GLOBAL,
            payload: {
              type: 'FOO',
              payload: {},
            },
          },
        };
        result = addPluginToNotification(next)(action);
      });
      it('should forward the action to "next"', () => {
        expect(next).toHaveBeenCalledWith(action);
      });
      it('should return the result of "next"', () => {
        expect(result).toBe('next-result');
      });
    });
  });
  describe('when the contained action is not "global"', () => {
    let next;
    let action;
    let result;
    beforeEach(() => {
      next = jest.fn(() => 'next-result');
      action = {
        type: __LOCAL,
        meta: { plugin: 'mcng-foo' },
        payload: {
          type: 'FOO',
          payload: {},
        },
      };
      result = addPluginToNotification(next)(action);
    });
    it('should forward the action to "next"', () => {
      expect(next).toHaveBeenCalledWith(action);
    });
    it('should return the result of "next"', () => {
      expect(result).toBe('next-result');
    });
  });
});

describe('when a non-local action is dispatched', () => {
  let next;
  let action;
  let result;
  beforeEach(() => {
    next = jest.fn(() => 'next-result');
    action = {
      type: 'FOO',
      payload: 'bar',
    };
    result = addPluginToNotification(next)(action);
  });
  it('should forward the action to "next"', () => {
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should return the result of "next"', () => {
    expect(result).toBe('next-result');
  });
});
