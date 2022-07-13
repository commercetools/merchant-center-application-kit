import { STATUS_CODES } from '@commercetools-frontend/constants';
import { useOnActionError } from '@commercetools-frontend/actions-global';

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
        message: 'This is an error',
        code: 'Invalid',
      },
    ],
  },
};
const onActionError = useOnActionError();
onActionError(error);
