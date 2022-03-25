/// <reference path="../../node_modules/vite/types/importMeta.d.ts" />

import { ComponentType } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

type TVisualRouteSpec = {
  routePath: string;
  Component: ComponentType;
};

const visualRoutesModules = import.meta.globEager<TVisualRouteSpec>(
  './components/**/*.visualroute.tsx'
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

const App = () => (
  <Router>
    <Switch>
      <Route
        path="/"
        exact
        component={() => (
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
        )}
      />
      {allSortedComponents.map(({ routePath, Component }) => (
        <Route key={routePath} path={routePath} component={Component} />
      ))}
    </Switch>
  </Router>
);

export default App;
