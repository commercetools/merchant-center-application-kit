import { Component, type ReactNode } from 'react';
import { connect } from 'react-redux';
import {
  showNotification,
  showApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import type {
  TAppNotificationDomain,
  TAppNotificationKind,
} from '@commercetools-frontend/constants';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import type {
  TAddNotificationAction,
  TNotification,
} from '@commercetools-frontend/notifications';
// ...

type TShowNotification = {
  domain: TAppNotificationDomain;
  kind: TAppNotificationKind;
  text?: string;
};

type TChannelsDetailsProps = {
  dispatch: (
    showNotification: TAddNotificationAction<TShowNotification & TNotification>
  ) => ReactNode;
};

class ChannelsDetails extends Component<TChannelsDetailsProps> {
  handleSubmit = (update) => async (formikValues) => {
    try {
      await update(formikValues);
      this.props.dispatch(
        showNotification<TShowNotification>({
          kind: NOTIFICATION_KINDS_SIDE.success,
          domain: DOMAINS.SIDE,
          text: 'Channel updated! 🎉',
        })
      );
    } catch (graphQLErrors) {
      const errors = Array.isArray(graphQLErrors)
        ? graphQLErrors
        : [graphQLErrors];
      if (errors.length > 0) {
        this.props.dispatch(
          showApiErrorNotification({
            errors,
          })
        );
      }
    }
  };
  render() {
    return (
          ]      // ...
    );
  }
}
export default connect()(ChannelsDetails);
