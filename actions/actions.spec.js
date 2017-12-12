import * as actions from './actions';

describe('fetch', () => {
  it('should match snapshot', () => {
    expect(actions.get({ foo: true })).toEqual({
      payload: { foo: true, method: 'GET' },
      type: 'SDK',
    });
  });
});

describe('update', () => {
  it('should match snapshot', () => {
    expect(actions.post({ foo: true })).toEqual({
      payload: { foo: true, method: 'POST' },
      type: 'SDK',
    });
  });
});
