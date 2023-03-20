import { lazy } from 'react';

const RequestsInFlightLoader = lazy(
  () =>
    import(
      './requests-in-flight-loader' /* webpackChunkName: "requests-in-flight-loader" */
    )
);

export default RequestsInFlightLoader;
export { default as requestsInFlightReducer } from './reducer';
