import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import * as globalActions from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';

const Notifier = props => {
  const showNotification = globalActions.useShowNotification();

  React.useEffect(() => {
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
      notification.dismiss();
    };
  }, []); // run only once

  return null;
};
Notifier.displayName = 'Notifier';
Notifier.propTypes = {
  domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
  kind: PropTypes.string.isRequired,
  text: PropTypes.string,
  meta: PropTypes.object,
  dismissAfter: PropTypes.number,
};
Notifier.defaultProps = {
  domain: DOMAINS.SIDE,
  kind: 'success',
};

export default Notifier;
