# PageUnauthorized

## Description

The PageUnauthorized component can be used for informing user they don't have permissions for certain resources in Merchant Center applications.

## Usage

```js
import { Switch, Route } from 'react-router-dom';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="/unauthorized" component={PageUnauthorized} />
  </Switch>
);
```
