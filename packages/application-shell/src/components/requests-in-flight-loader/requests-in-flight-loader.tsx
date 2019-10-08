import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '@commercetools-frontend/ui-kit';
import { REQUESTS_IN_FLIGHT_LOADER_DOM_ID } from './constants';
import messages from './messages';

const getPortalContainer = () =>
  process.env.NODE_ENV === 'test'
    ? document.body
    : (document.querySelector<HTMLElement>(
        `#${REQUESTS_IN_FLIGHT_LOADER_DOM_ID}`
      ) as HTMLElement);

const RequestsInFlightLoader = () => {
  const hasRequestsInFlight = useSelector<
    { requestsInFlight?: string[] },
    boolean
  >(state =>
    Boolean(state.requestsInFlight && state.requestsInFlight.length > 0)
  );

  if (!hasRequestsInFlight) return null;

  return ReactDOM.createPortal(
    <LoadingSpinner>
      <FormattedMessage {...messages.labelLoading} />
    </LoadingSpinner>,
    getPortalContainer()
  );
};
RequestsInFlightLoader.displayName = 'RequestsInFlightLoader';

export default RequestsInFlightLoader;
