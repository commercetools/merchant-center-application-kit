import { TForwardToExchangeTokenClaim } from '../types';
import * as actions from './actions';

describe.each`
  method      | uri           | body
  ${'GET'}    | ${'/foo/bar'} | ${undefined}
  ${'DELETE'} | ${'/foo/bar'} | ${undefined}
  ${'HEAD'}   | ${'/foo/bar'} | ${undefined}
  ${'POST'}   | ${'/foo/bar'} | ${JSON.stringify({ name: 'bar' })}
  ${'POST'}   | ${'/foo/bar'} | ${new FormData()}
`('method $method ($uri)', ({ method, uri, body }) => {
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
            'X-Forward-To-Audience-Policy': 'forward-url-full-path',
            'x-forward-header-accept-language': '*',
            'x-forward-header-x-foo': 'bar',
          },
          ...(body ? { payload: body } : {}),
        },
      });
    });
    it('should include "X-Forward-To-Claims" header', () => {
      const payloadWithoutBody = {
        uri,
        headers: {
          'x-foo': 'bar',
          'accept-language': '*',
        },
        // Force casting here to allow adding a non valid claim to check it will
        // not be included in the header
        exchangeTokenClaims: [
          'permissions',
          'imaginary-claim',
        ] as TForwardToExchangeTokenClaim[],
      };
      const payloadWithBody = {
        ...payloadWithoutBody,
        payload: body,
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
          exchangeTokenClaims: ['permissions', 'imaginary-claim'],
          method,
          uri: '/proxy/forward-to',
          mcApiProxyTarget: undefined,
          headers: {
            'Accept-version': 'v2',
            'X-Forward-To': uri,
            'X-Forward-To-Audience-Policy': 'forward-url-full-path',
            'X-Forward-To-Claims': 'permissions',
            'x-forward-header-accept-language': '*',
            'x-forward-header-x-foo': 'bar',
          },
          ...(body ? { payload: body } : {}),
        },
      });
    });
  });
});
