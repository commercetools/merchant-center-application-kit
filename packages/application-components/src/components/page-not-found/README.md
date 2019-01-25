# PageNotFound

#### Description

The PageNotFound component can be used as a `404` or page not found route for merchant center applications.

#### Usage

```js
import { Switch, Route } from 'react-router-dom';
import { PageNotFound } from '@commercetools-frontend/application-components';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="*" component={PageNotFound} />
  </Switch>
);
```
