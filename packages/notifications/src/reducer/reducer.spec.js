import { addNotification, removeNotification } from '../action-creators';
import reducer from './reducer';

describe('reducing add/remove notification actions', () => {
  it('should reduce the add notification action', () => {
    const notification = { id: 1, foo: 'bar' };
    const state = [{ id: 0, foo: 'baz' }];
    expect(reducer(state, addNotification(notification))).toEqual([
      { id: 1, foo: 'bar' },
      { id: 0, foo: 'baz' },
    ]);
  });

  it('should reduce the remove notification action', () => {
    const state = [{ id: 0, foo: 'bar' }, { id: 1, foo: 'baz' }];
    expect(reducer(state, removeNotification(1))).toEqual([
      { id: 0, foo: 'bar' },
    ]);
  });
});
