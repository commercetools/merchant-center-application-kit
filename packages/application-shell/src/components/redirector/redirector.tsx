import { useEffect } from 'react';
import { encode } from 'qss';
import type { RouteComponentProps } from 'react-router-dom';
import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';

import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { location } from '../../utils/location';

type QueryParams = {
  reason?: (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS];
  redirectTo?: string;
  client_id?: string;
  response_type?: string;
  scope?: string;
  state?: string;
  nonce?: string;
};
type Props = {
  to: string;
  origin?: string;
  location?: RouteComponentProps['location'];
  queryParams?: QueryParams;
};

const redirectTo = (targetUrl: string) => {
  location.replace(targetUrl);
};

const Redirector = (props: Props) => {
  // For now the authentication service runs on the same domain as the application,
  // even on development (using the webpack dev server).
  const originUrl = props.origin ?? window.location.origin;
  const enhancedLocation = (props.location ||
    {}) as TEnhancedLocation<QueryParams>;
  const searchQuery = {
    ...(props.queryParams ?? {}),
    ...(enhancedLocation.query ?? {}),
  };
  const targetUrlObject = new URL(originUrl);
  targetUrlObject.pathname = props.to || targetUrlObject.pathname;
  targetUrlObject.search = `?${encode(searchQuery)}`;
  const targetUrl = targetUrlObject.toString();

  useEffect(() => {
    redirectTo(targetUrl);
  }, [targetUrl]);

  return null;
};
Redirector.displayName = 'Redirector';

export default Redirector;
