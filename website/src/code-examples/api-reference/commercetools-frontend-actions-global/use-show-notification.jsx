import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';

const showSuccessNotification = useShowNotification();
showSuccessNotification({
  domain: DOMAINS.SIDE,
  kind: NOTIFICATION_KINDS_SIDE.success,
  text: 'All good!',
});
