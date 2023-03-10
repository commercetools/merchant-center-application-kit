import { createContext, ReactNode, useEffect } from 'react';
import defaultTrackingEventList from '../../tracking-event-list';
import * as gtm from '../../utils/gtm';

export type TGtmTrackingEventList = {
  [key: string]: string;
};
export type Props = {
  trackingEventList: {
    [key: string]: string | TGtmTrackingEventList;
  };
  children: ReactNode;
};

// Expose a Context with the tracking functions.
// This context can be used by consumers to access the values by either:
// 1. using `<GtmContext.Consumer>`
// 2. `static contextType = GtmContext;`
// NOTE: we do not need to define a `GtmContext.Provider`, as React will
// fall back to the default value defined, when the context was created,
// in case the component does not have a matching Provider above in the tree.
// https://reactjs.org/docs/context.html#reactcreatecontext
export const GtmContext = createContext({
  track: gtm.track,
  getHierarchy: gtm.getHierarchy,
  trackUserBusinessRole: gtm.trackUserBusinessRole,
});

const GtmBooter = (props: Props) => {
  useEffect(() => {
    // We don't need any user data to start using GTM, for example for
    // tracking page views and flows when the user is not logged in.
    gtm.boot({
      ...defaultTrackingEventList,
      ...props.trackingEventList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{props.children}</>;
};
GtmBooter.displayName = 'GtmBooter';

export default GtmBooter;
