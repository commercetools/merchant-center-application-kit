import * as actions from './actions';

describe.each`
  method      | uri           | body
  ${'GET'}    | ${'/foo/bar'} | ${undefined}
  ${'DELETE'} | ${'/foo/bar'} | ${undefined}
  ${'HEAD'}   | ${'/foo/bar'} | ${undefined}
  ${'POST'}   | ${'/foo/bar'} | ${JSON.stringify({ name: 'bar' })}
`('method $method', ({ method, uri, body }) => {
  it('should build action for uri', () => {
    const payloadWithBody = { uri, payload: body };
    const payloadWithoutBody = { uri };

    let result;
    switch (method) {
      case 'GET':
        result = actions.get(payloadWithoutBody);
        break;
      case 'DELETE':
        result = actions.del(payloadWithoutBody);
        break;
      case 'HEAD':
        result = actions.head(payloadWithoutBody);
        break;
      case 'POST':
        result = actions.post(payloadWithBody);
        break;
      default:
        break;
    }

    expect(result).toEqual({
      type: 'SDK',
      payload: { method, ...(body ? payloadWithBody : payloadWithoutBody) },
    });
  });
  it('should build action for service', () => {
    const payloadWitBody = {
      service: 'products',
      options: { page: 1 },
      payload: body,
    };
    const payloadWithoutBody = { service: 'products', options: { page: 1 } };

    let result;
    switch (method) {
      case 'GET':
        result = actions.get(payloadWithoutBody);
        break;
      case 'DELETE':
        result = actions.del(payloadWithoutBody);
        break;
      case 'HEAD':
        result = actions.head(payloadWithoutBody);
        break;
      case 'POST':
        result = actions.post(payloadWitBody);
        break;
      default:
        break;
    }

    expect(result).toEqual({
      type: 'SDK',
      payload: { method, ...(body ? payloadWitBody : payloadWithoutBody) },
    });
  });
  describe('with forwardTo proxy', () => {
    it('should build action', () => {
      const payloadWithBody = {
        uri,
        headers: {
          'x-foo': 'bar',
          'accept-language': '*',
        },
        payload: body,
      };
      const payloadWithoutBody = {
        uri,
        headers: {
          'x-foo': 'bar',
          'accept-language': '*',
        },
      };

      let result;
      switch (method) {
        case 'GET':
          result = actions.forwardTo.get(payloadWithoutBody);
          break;
        case 'DELETE':
          result = actions.forwardTo.del(payloadWithoutBody);
          break;
        case 'HEAD':
          result = actions.forwardTo.head(payloadWithoutBody);
          break;
        case 'POST':
          result = actions.forwardTo.post(payloadWithBody);
          break;
        default:
          break;
      }

      expect(result).toEqual({
        type: 'SDK',
        payload: {
          method,
          uri: '/proxy/forward-to',
          mcApiProxyTarget: undefined,
          headers: {
            'Accept-version': 'v2',
            'X-Forward-To': uri,
            'x-forward-header-accept-language': '*',
            'x-forward-header-x-foo': 'bar',
          },
          ...(body ? { payload: body } : {}),
        },
      });
    });
  });
});
