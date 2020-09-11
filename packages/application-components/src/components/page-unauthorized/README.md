# PageUnauthorized

## Description

The PageUnauthorized component can be used to inform a user that certain permissions are lacking for views of a respective Merchant Center application.

## Usage

```js
import { Routes, Route } from 'react-router-dom';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

const Routes = () => (
  <Routes>
    <Route path="/"><Home /></Route>
    <Route path="/user/*"><User /></Route>
    <Route path="/unauthorized/*"><PageUnauthorized /></Route>
  </Routes>
);
```
