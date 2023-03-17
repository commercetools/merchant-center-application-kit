import { lazy } from 'react';

const EchoServer = lazy(() =>
  import('./echo-server' /* webpackChunkName: "echo-server" */)
);

export default EchoServer;
