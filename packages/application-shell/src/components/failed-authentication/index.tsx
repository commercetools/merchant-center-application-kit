import React from 'react';

const FailedAuthentication = React.lazy(
  () =>
    import(
      './failed-authentication' /* webpackChunkName: "failed-authentication" */
    )
);

export default FailedAuthentication;
