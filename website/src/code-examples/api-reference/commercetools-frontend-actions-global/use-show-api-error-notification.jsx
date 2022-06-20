import { STATUS_CODES } from '@commercetools-frontend/constants';
import { useOnActionError } from '@commercetools-frontend/actions-global';

const error = {
  statusCode: STATUS_CODES.FORBIDDEN, // statusCode: 403
  body: {
    message: "This is an error",
    errors: [
      {
        message:
          "This is an error",
        code: "Invalid",
      },
    ],
  },
}
const onActionError = useOnActionError();
onActionError(error)