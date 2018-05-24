import React from 'react';
import PropTypes from 'prop-types';
import * as gtm from '../../utils/gtm';
import defaultTrackingEventWhitelist from '../../tracking-whitelist';

const mcngShape = PropTypes.shape({
  track: PropTypes.func.isRequired,
  getHierarchy: PropTypes.func.isRequired,
});

class GtmBooter extends React.Component {
  static displayName = 'GtmBooter';
  static propTypes = {
    children: PropTypes.node.isRequired,
    trackingEventWhitelist: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string),
      ])
    ).isRequired,
  };
  static contextTypes = {
    mcng: mcngShape,
  };
  static childContextTypes = {
    mcng: mcngShape.isRequired,
  };
  getChildContext() {
    return {
      mcng: {
        track: gtm.track,
        getHierarchy: gtm.getHierarchy,
      },
    };
  }
  componentDidMount() {
    // We don't need any user data to start using GTM, for example for
    // tracking page views and flows when the user is not logged in.
    gtm.boot({
      ...defaultTrackingEventWhitelist,
      ...this.props.trackingEventWhitelist,
    });
  }
  render() {
    return this.props.children;
  }
}

export default GtmBooter;
