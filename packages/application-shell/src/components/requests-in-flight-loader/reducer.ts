import type { Action } from 'redux';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import type {
  TRequestsInFlightState,
  TShowRequestInFlightAction,
  THideRequestInFlightAction,
} from './types';

const isShowRequestInFlightAction = (
  action: Action
): action is TShowRequestInFlightAction => action.type === SHOW_LOADING;
const isHideRequestInFlightAction = (
  action: Action
): action is THideRequestInFlightAction => action.type === HIDE_LOADING;

const excludeFirstOccurrence = <Item>(list: Item[], item: Item) => {
  const index = list.indexOf(item);
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

export default (requestsInFlight?: TRequestsInFlightState, action?: Action) => {
  if (!requestsInFlight || !action) return [];

  if (isShowRequestInFlightAction(action))
    return [...requestsInFlight, action.payload];

  if (isHideRequestInFlightAction(action)) {
    // may only remove first occurence
    if (!requestsInFlight.includes(action.payload)) {
      reportErrorToSentry(
        new Error(
          `Tried to hide "${action.payload}", but it was not progressing!`
        )
      );
      return requestsInFlight;
    }
    return excludeFirstOccurrence(requestsInFlight, action.payload);
  }

  return requestsInFlight;
};
