import { STATUS_CODES } from '@commercetools-frontend/constants';
const error = {
  statusCode: STATUS_CODES.FORBIDDEN, // statusCode: 403
  body: {
    message: 'This is an error',
    errors: [
      {
        message: 'This is an error', // this message will be displayed as notification text
        code: 'Invalid',
      },
    ],
  },
};
// ...
dispatch(handleActionError(error)); // dispatch method from Redux store
