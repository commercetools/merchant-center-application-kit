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
  // ...
  body: {
    // ...
    errors: [
      {
        message: 'This is the first error', // displayed as the notification text
        code: 'Invalid',
      },
      {
        message: 'This is the second error', // also displayed as the notification text
        code: 'Invalid',
      },
    ],
  },
};
