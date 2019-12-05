import React from 'react';
import PropTypes from 'prop-types';
import * as gtm from '../../utils/gtm';
import defaultTrackingEventWhitelist from '../../tracking-whitelist';

// Expose a React.Context with the tracking functions.
// This context can be used by consumers to access the values by either:
// 1. using `<GtmContext.Consumer>`
// 2. `static contextType = GtmContext;`
// NOTE: we do not need to define a `GtmContext.Provider`, as React will
// fall back to the default value defined, when the context was created,
// in case the component does not have a matching Provider above in the tree.
// https://reactjs.org/docs/context.html#reactcreatecontext
export const GtmContext = React.createContext({
  track: gtm.track,
  getHierarchy: gtm.getHierarchy,
});

const GtmBooter = props => {
  React.useEffect(() => {
    // We don't need any user data to start using GTM, for example for
    // tracking page views and flows when the user is not logged in.
    gtm.boot({
      ...defaultTrackingEventWhitelist,
      ...props.trackingEventWhitelist,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return props.children;
};
GtmBooter.displayName = 'GtmBooter';
GtmBooter.propTypes = {
  children: PropTypes.node.isRequired,
  trackingEventWhitelist: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string),
    ])
  ).isRequired,
};

export default GtmBooter;
