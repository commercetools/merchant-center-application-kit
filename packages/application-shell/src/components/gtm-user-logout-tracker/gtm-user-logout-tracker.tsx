import { useEffect } from 'react';
import * as gtm from '../../utils/gtm';

const GtmUserLogoutTracker = () => {
  useEffect(() => {
    // When the user is not logged in anymore (e.g. on logout) we still track
    // page views but without the user data in context.
    gtm.stopTrackingUser();
  }, []);
  return null;
};
GtmUserLogoutTracker.displayName = 'GtmUserLogoutTracker';

export default GtmUserLogoutTracker;
