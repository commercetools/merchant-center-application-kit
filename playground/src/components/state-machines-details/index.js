import { lazy } from 'react';

const StateMachinesDetails = lazy(() =>
  import(
    './state-machines-details' /* webpackChunkName: "state-machines-details" */
  )
);

export default StateMachinesDetails;
