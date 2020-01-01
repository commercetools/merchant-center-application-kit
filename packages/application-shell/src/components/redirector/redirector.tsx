import React from 'react';
import { encode } from 'qss';
import { TEnhancedLocation } from '@commercetools-frontend/browser-history';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';

type QueryParams = {
  reason: typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];
  redirectTo?: string;
};
type Props = {
  to: string;
  location: TEnhancedLocation<QueryParams>;
  queryParams: QueryParams;
};

const redirectTo = (targetUrl: string) => window.location.replace(targetUrl);

const Redirector = (props: Props) => {
  React.useEffect(() => {
    // For now the authentication service runs on the same domain as the application,
    // even on development (using the webpack dev server).
    const authUrl = window.location.origin;

    const searchQuery = {
      ...props.queryParams,
      ...((props.location || {}).query || {}),
    };

    redirectTo(`${authUrl}/${props.to}?${encode(searchQuery)}`);
  }, [props.location, props.queryParams, props.to]);

  return null;
};
Redirector.displayName = 'Redirector';

export default Redirector;
