import * as actions from './actions';

describe('get', () => {
  it('should have `type`', () => {
    expect(actions.get({})).toEqual({
      payload: expect.any(Object),
      type: 'SDK',
    });
  });

  it('should have `payload`', () => {
    expect(actions.get({ foo: true })).toEqual({
      payload: expect.objectContaining({ foo: true }),
      type: expect.any(String),
    });
  });

  it('should have `GET` `method` in payload', () => {
    expect(actions.get({ foo: true })).toEqual({
      payload: expect.objectContaining({ method: 'GET' }),
      type: expect.any(String),
    });
  });
});

describe('post', () => {
  it('should have `type`', () => {
    expect(actions.post({})).toEqual({
      payload: expect.any(Object),
      type: 'SDK',
    });
  });

  it('should have `payload`', () => {
    expect(actions.post({ foo: true })).toEqual({
      payload: expect.objectContaining({ foo: true }),
      type: expect.any(String),
    });
  });

  it('should have `POST` `method` in payload', () => {
    expect(actions.post({ foo: true })).toEqual({
      payload: expect.objectContaining({ method: 'POST' }),
      type: expect.any(String),
    });
  });
});

describe('remove', () => {
  it('should have `type`', () => {
    expect(actions.remove({})).toEqual({
      payload: expect.any(Object),
      type: 'SDK',
    });
  });

  it('should have `payload`', () => {
    expect(actions.remove({ foo: true })).toEqual({
      payload: expect.objectContaining({ foo: true }),
      type: expect.any(String),
    });
  });

  it('should have `DELETE` `method` in payload', () => {
    expect(actions.remove({ foo: true })).toEqual({
      payload: expect.objectContaining({ method: 'DELETE' }),
      type: expect.any(String),
    });
  });
});
