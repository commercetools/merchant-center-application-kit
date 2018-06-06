import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isNumber from 'lodash.isnumber';
import * as globalActions from '@commercetools-local/actions-global';
import { DOMAINS } from '@commercetools-local/constants';

export class Notifier extends React.Component {
  static displayName = 'Notifier';
  static propTypes = {
    showNotification: PropTypes.func.isRequired,
    domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
    kind: PropTypes.string.isRequired,
    text: PropTypes.string,
    meta: PropTypes.object,
    dismissAfter: PropTypes.number,
  };

  static defaultProps = {
    domain: DOMAINS.SIDE,
    kind: 'success',
  };

  notificationHandle = false;

  componentDidMount() {
    this.notificationHandle = this.props.showNotification(
      {
        domain: this.props.domain,
        kind: this.props.kind,
        text: this.props.text,
      },
      isNumber(this.props.dismissAfter)
        ? { ...this.props.meta, dismissAfter: this.props.dismissAfter }
        : this.props.meta
    );
  }

  componentWillUnmount() {
    this.notificationHandle.dismiss();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  {
    showNotification: globalActions.showNotification,
  }
)(Notifier);
