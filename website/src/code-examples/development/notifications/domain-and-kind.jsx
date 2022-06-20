import {
  useShowNotification
} from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
  NOTIFICATION_KINDS_PAGE
} from '@commercetools-frontend/constants';

// eslint-disable-next-line react-hooks/rules-of-hooks
const showNotification = useShowNotification();

// success notification in side domain
showNotification({
  kind: NOTIFICATION_KINDS_SIDE.success,
  domain: DOMAINS.SIDE,
  text: 'Success 🎉',
});

// warning notification in page domain
showNotification({
  kind: NOTIFICATION_KINDS_PAGE.warning,
  domain: DOMAINS.PAGE,
  text: 'Warning ⚠️',
});
