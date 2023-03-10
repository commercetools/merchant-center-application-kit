import { useEffect } from 'react';
import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';

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
  useEffect(() => {
    if (props.user) {
      gtm.updateUser(props.user.id);
    }
  }, [props.user]);
  return null;
};
GtmUserTracker.displayName = 'GtmUserTracker';

export default GtmUserTracker;
