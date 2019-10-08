import { Action } from 'redux';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';

export type TShowRequestInFlightAction = Action<typeof SHOW_LOADING> & {
  payload: string;
};

export type THideRequestInFlightAction = Action<typeof HIDE_LOADING> & {
  payload: string;
};
