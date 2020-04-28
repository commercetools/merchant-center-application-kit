import type { TStatusCode } from '@commercetools-frontend/constants';

import handleActionError from './handle-action-error';

let dispatch: jest.Mock;
beforeEach(() => {
  dispatch = jest.fn();
  console.error = jest.fn();
});

describe('handleActionError', () => {
  it('notifies user about unknown error', () => {
    const error = new Error('oupsy, something went wrong');
    handleActionError(error)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      meta: {
        dismissAfter: 0,
      },
      payload: {
        domain: 'page',
        id: 0,
        kind: 'unexpected-error',
        values: {},
      },
      type: 'ADD_NOTIFICATION',
    });
  });

  it('notifies user about API error', () => {
    class FakeApiError extends Error {
      statusCode: TStatusCode;
      body: {
        message: string;
      };

      constructor(statusCode: TStatusCode, message: string) {
        super();
        this.statusCode = statusCode;
        this.body = {
          message,
        };
      }
    }

    const error = new FakeApiError(
      401,
      "Required attribute 'key-required' cannot be removed."
    );
    handleActionError(error)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      meta: {
        dismissAfter: 0,
      },
      payload: {
        domain: 'page',
        id: 0,
        kind: 'api-error',
        values: {
          errors: [
            {
              message: "Required attribute 'key-required' cannot be removed.",
            },
          ],
        },
      },
      type: 'ADD_NOTIFICATION',
    });
  });
});
