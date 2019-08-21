import * as actions from './actions';

describe('get', () => {
  it('should build action for uri', () => {
    const payload = { uri: '/foo/bar' };
    expect(actions.get(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'GET', ...payload },
    });
  });
  it('should build action for service', () => {
    const payload = { service: 'products', options: { page: 1 } };
    expect(actions.get(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'GET', ...payload },
    });
  });
});

describe('del', () => {
  it('should build action for uri', () => {
    const payload = { uri: '/foo/bar' };
    expect(actions.del(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'DELETE', ...payload },
    });
  });
  it('should build action for service', () => {
    const payload = { service: 'products', options: { page: 1 } };
    expect(actions.del(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'DELETE', ...payload },
    });
  });
});

describe('head', () => {
  it('should build action for uri', () => {
    const payload = { uri: '/foo/bar' };
    expect(actions.head(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'HEAD', ...payload },
    });
  });
  it('should build action for service', () => {
    const payload = { service: 'products', options: { page: 1 } };
    expect(actions.head(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'HEAD', ...payload },
    });
  });
});

describe('post', () => {
  it('should build action for uri', () => {
    const payload = { uri: '/foo/bar', payload: { name: 'bar' } };
    expect(actions.post(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'POST', ...payload },
    });
  });
  it('should build action for service', () => {
    const payload = {
      service: 'products',
      options: { page: 1 },
      payload: { name: 'bar' },
    };
    expect(actions.post(payload)).toEqual({
      type: 'SDK',
      payload: { method: 'POST', ...payload },
    });
  });
});
