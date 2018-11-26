import React from 'react';

export default React.lazy(() =>
  import('./index' /* webpackChunkName: "login-sso" */)
);
