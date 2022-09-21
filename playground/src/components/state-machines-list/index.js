import { lazy } from 'react';

const StateMachinesList = lazy(
  () =>
    import(
      './state-machines-list' /* webpackChunkName: "state-machines-list" */
    )
);

export default StateMachinesList;
