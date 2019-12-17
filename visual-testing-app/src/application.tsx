import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

interface ApplicationWindow extends Window {
  onAppLoaded: () => void;
}
declare let window: ApplicationWindow;

type TVisualRouteSpec = {
  routePath: string;
  Component: React.ComponentType;
};

const visualRoutesContext = require.context(
  './components/',
  true,
  /\.visualroute\.tsx$/
);

const visualRoutes = visualRoutesContext
  .keys()
  .map<TVisualRouteSpec>(id => visualRoutesContext(id));

const hideAppLoader = () => {
  /**
   * NOTE:
   *   This function is defined in the `index.html` in a script-tag
   *   by the `html-template.js` in the `mc-scripts`. There are
   *   alternative ways of acheiving this namely:
   *   1. Using custom events and dispatching here
   *     - Not supported in IE11 and would need a polyfill
   *   2. Removing the DOM node here
   *     - Both `index.html` and this component would have to
   *       now the div's id/class. If one would change the index.html
   *       the app would never show (always show the loading screen)
   */
  if (window.onAppLoaded) window.onAppLoaded();
};

const App = () => {
  React.useEffect(() => {
    hideAppLoader();
  }, []);
  return (
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
};
App.displayName = 'App';

export default App;
