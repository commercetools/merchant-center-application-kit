import React from 'react';
import PropTypes from 'prop-types';
import * as gtm from '../../utils/gtm';
import defaultTrackingEventWhitelist from '../../tracking-whitelist';

export const GtmContext = React.createContext({
  track: () => {},
  getHierarchy: () => {},
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
  componentDidMount() {
    // We don't need any user data to start using GTM, for example for
    // tracking page views and flows when the user is not logged in.
    gtm.boot({
      ...defaultTrackingEventWhitelist,
      ...this.props.trackingEventWhitelist,
    });
  }
  render() {
    return (
      <GtmContext.Provider
        value={{
          track: gtm.track,
          getHierarchy: gtm.getHierarchy,
        }}
      >
        {this.props.children}
      </GtmContext.Provider>
    );
  }
}

export default GtmBooter;
