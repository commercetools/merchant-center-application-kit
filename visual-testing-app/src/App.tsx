import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as routes from './routes';

const visualRoutes = Object.values(routes).filter(
  value => typeof value !== 'boolean'
);

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
              {visualRoutes.map(({ routePath }) => (
                <li key={routePath}>
                  <a href={routePath}>{routePath}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      />
      {visualRoutes.map(({ routePath, Component }) => (
        <Route key={routePath} path={routePath} component={Component} />
      ))}
    </Switch>
  </Router>
);
App.displayName = 'App';

export default App;
