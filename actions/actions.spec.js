import * as actions from './actions';

describe('fetch', () => {
  it('should match snapshot', () => {
    expect(actions.fetch({ foo: true })).toEqual({
      payload: { foo: true, method: 'fetch' },
      type: 'SDK',
    });
  });
});

describe('update', () => {
  it('should match snapshot', () => {
    expect(actions.update({ foo: true })).toEqual({
      payload: { foo: true, method: 'update' },
      type: 'SDK',
    });
  });
});
