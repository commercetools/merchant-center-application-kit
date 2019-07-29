import React from 'react';
import isNumber from 'lodash/isNumber';
import * as globalActions from '@commercetools-frontend/actions-global';
import {
  NOTIFICATION_DOMAINS,
  TAppNotificationDomain,
  TAppNotificationKind,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';

const defaultProps = {
  domain: NOTIFICATION_DOMAINS.SIDE,
  kind: NOTIFICATION_KINDS_SIDE.success,
};
type DefaultProps = typeof defaultProps;
type Props = {
  domain: TAppNotificationDomain;
  kind: TAppNotificationKind;
  text?: string;
  meta?: { [key: string]: unknown };
  dismissAfter?: number;
} & DefaultProps;

const Notifier = (props: Props) => {
  const showNotification = globalActions.useShowNotification<
    Props & { id: number }
  >();

  React.useEffect(() => {
    const notification = showNotification(
      {
        id: 0,
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
