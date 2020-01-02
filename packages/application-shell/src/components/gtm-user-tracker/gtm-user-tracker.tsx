import React from 'react';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import * as gtm from '../../utils/gtm';

type TFetchedUser = TFetchLoggedInUserQuery['user'];
type Props = {
  user: TFetchedUser;
};

/**
 * This component will let gtm know if any information about the user has
 * changed.
 */
const GtmUserTracker = (props: Props) => {
  React.useEffect(() => {
    if (props.user) {
      gtm.updateUser(props.user.id);
    }
  }, [props.user]);
  return null;
};
GtmUserTracker.displayName = 'GtmUserTracker';

export default GtmUserTracker;
