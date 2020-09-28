import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { location } from '../../utils/location';

type QueryParams = {
  reason?: typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];
  redirectTo?: string;
};
type Props = {
  to: string;
  queryParams: QueryParams;
};

const redirectTo = (targetUrl: string) => location.replace(targetUrl);

const Redirector = (props: Props) => {
  const location = useLocation();
  React.useEffect(() => {
    // For now the authentication service runs on the same domain as the application,
    // even on development (using the webpack dev server).
    const authUrl = window.location.origin;
    const enhancedLocation = (location || {}) as TEnhancedLocation<QueryParams>;
    const searchQuery = {
      ...props.queryParams,
      ...(enhancedLocation.query || {}),
    };

    redirectTo(`${authUrl}/${props.to}?${encode(searchQuery)}`);
  }, [location, props.queryParams, props.to]);

  return null;
};
Redirector.displayName = 'Redirector';

export default Redirector;
