import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import * as gtm from '../../utils/gtm';
import defaultTrackingEventWhitelist from '../../tracking-whitelist';

const GtmContext = React.createContext({
  track: gtm.track,
  getHierarchy: gtm.getHierarchy,
});
export const GetGtmTracking = props => (
  <GtmContext.Consumer>
    {trackingContext => props.render(trackingContext)}
  </GtmContext.Consumer>
);
GetGtmTracking.displayName = 'GetGtmTracking';
GetGtmTracking.propTypes = { render: PropTypes.func.isRequired };
export const withGtmTracking = (propKey = 'gtmTracking') => Component => {
  const WrappedComponent = props => (
    <GetGtmTracking
      render={trackingContext => (
        <Component {...props} {...{ [propKey]: trackingContext }} />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(Component, 'withGtmTracking');
  return WrappedComponent;
};

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
    return <GtmContext.Provider>{this.props.children}</GtmContext.Provider>;
  }
}

export default GtmBooter;
