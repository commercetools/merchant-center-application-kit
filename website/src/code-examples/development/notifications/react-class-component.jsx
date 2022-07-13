import { Component } from 'react';
import { connect } from 'react-redux';
import {
  showNotification,
  showApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
// ...

class ChannelsDetails extends Component {
  handleSubmit = (update) => async (formikValues) => {
    try {
      await update(formikValues);
      this.props.dispatch(
        showNotification({
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
      // ...
    );
  }
}
export default connect()(ChannelsDetails);
