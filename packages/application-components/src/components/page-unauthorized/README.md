# PageUnauthorized

## Description

The PageUnauthorized component can be used to inform a user that certain permissions are lacking for views of a respective Merchant Center application.

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
