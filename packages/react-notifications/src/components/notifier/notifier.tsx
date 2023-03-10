import { useEffect } from 'react';
import isNumber from 'lodash/isNumber';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import type {
  TAppNotificationDomain,
  TAppNotificationKind,
} from '@commercetools-frontend/constants';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';

type Props = {
  domain: TAppNotificationDomain;
  kind: TAppNotificationKind;
  text?: string;
  meta?: { [key: string]: unknown };
  dismissAfter?: number;
};
const defaultProps: Pick<Props, 'domain' | 'kind'> = {
  domain: NOTIFICATION_DOMAINS.SIDE,
  kind: NOTIFICATION_KINDS_SIDE.success,
};

const Notifier = (props: Props) => {
  const showNotification = useShowNotification<Props>();

  useEffect(() => {
    const notification = showNotification(
      {
        domain: props.domain,
        kind: props.kind,
        text: props.text,
      },
      isNumber(props.dismissAfter)
        ? { ...props.meta, dismissAfter: props.dismissAfter }
        : props.meta
    );
    return () => {
      // Remove notification when component "unmounts"
      notification.dismiss && notification.dismiss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We want to run this only once, when the component mounts the first time. Therefore we need to pass an empty array, even though the eslint rule shows a warning.

  return null;
};
Notifier.displayName = 'Notifier';
Notifier.defaultProps = defaultProps;

export default Notifier;
