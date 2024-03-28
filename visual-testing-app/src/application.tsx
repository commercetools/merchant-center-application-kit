/// <reference path="../node_modules/vite/types/importMeta.d.ts" />

import './globals.css';
import { type ComponentType, Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { TestProviderFlopFlip } from '@flopflip/react-broadcast';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { featureFlags } from '@commercetools-frontend/constants';
import apolloClient from './apollo-client';

type TVisualRouteSpec = {
  routePath: string;
  Component: ComponentType;
};

const visualRoutesModules = import.meta.glob<TVisualRouteSpec>(
  './components/**/*.visualroute.tsx',
  { eager: true }
);

const allUniqueVisualRouteComponents = Object.values(
  visualRoutesModules
).reduce<Record<string, TVisualRouteSpec>>((allComponents, RouteComponent) => {
  const route = RouteComponent.routePath.substring(1);
  if (allComponents[route]) {
    console.error(`Duplicate route generated for: /${route}`);
  }
  allComponents[route] = RouteComponent;
  return allComponents;
}, {} as Record<string, TVisualRouteSpec>);
const allSortedComponents = Object.keys(allUniqueVisualRouteComponents)
  .sort()
  .map<TVisualRouteSpec>((key) => allUniqueVisualRouteComponents[key]);

const appFlags = {
  [featureFlags.CUSTOM_VIEWS]: { value: true },
};

const App = () => (
  <ApolloProvider client={apolloClient}>
    <TestProviderFlopFlip flags={appFlags}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>Visual Testing App</h1>
              <ul>
                {allSortedComponents.map(({ routePath }) => (
                  <li key={routePath}>
                    <a href={routePath}>{routePath}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Route>
          {allSortedComponents.map(({ routePath, Component }) => (
            <Route key={routePath} path={routePath}>
              <Suspense fallback={'Loading...'}>
                <Component />
              </Suspense>
            </Route>
          ))}
        </Switch>
      </Router>
    </TestProviderFlopFlip>
  </ApolloProvider>
);

export default App;
