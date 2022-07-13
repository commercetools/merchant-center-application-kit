import { STATUS_CODES } from '@commercetools-frontend/constants';

type TStatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];

type TAppNotificationApiError<ExtraFields extends {} = {}> = {
  message: string;
  /** @deprecated Use `extensions.code` */
  code?: string;
  extensions?: {
    code?: string;
  };
} & ExtraFields;

type TActionError = {
  statusCode: TStatusCode;
  body: {
    message: string;
    errors?: TAppNotificationApiError | TAppNotificationApiError[];
  };
};

const error: TActionError = {
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
