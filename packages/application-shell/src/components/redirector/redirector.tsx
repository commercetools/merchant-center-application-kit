import { useCallback, useEffect } from 'react';
import { encode } from 'qss';
import type { RouteComponentProps } from 'react-router-dom';
import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { location } from '../../utils/location';

type TQueryParams = {
  reason?: (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS];
  redirectTo?: string;
  client_id?: string;
  response_type?: string;
  scope?: string;
  state?: string;
  nonce?: string;
};
type TRedirectorProps = {
  to: string;
  origin?: string;
  location?: RouteComponentProps['location'];
  queryParams?: TQueryParams;
};

const redirectTo = (targetUrl: string) => {
  location.replace(targetUrl);
};

const useRedirector = () => {
  const redirector = useCallback<(options: TRedirectorProps) => void>(
    (options) => {
      // For now the authentication service runs on the same domain as the application,
      // even on development (using the webpack dev server).
      const originUrl = options.origin ?? window.location.origin;
      const enhancedLocation = (options.location ||
        {}) as TEnhancedLocation<TQueryParams>;
      const searchQuery = {
        ...(options.queryParams ?? {}),
        ...(enhancedLocation.query ?? {}),
      };
      const targetUrlObject = new URL(originUrl);
      targetUrlObject.pathname = options.to || targetUrlObject.pathname;
      targetUrlObject.search = `?${encode(searchQuery)}`;
      const targetUrl = targetUrlObject.toString();

      redirectTo(targetUrl);
    },
    []
  );

  return redirector;
};

const Redirector = (props: TRedirectorProps) => {
  const redirector = useRedirector();

  useEffect(() => {
    redirector(props);
    // Only execute once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
Redirector.displayName = 'Redirector';

export { useRedirector, Redirector };
