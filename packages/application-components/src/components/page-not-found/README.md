# PageNotFound

## Description

The PageNotFound component can be used as a `404` or page not found route for Merchant Center applications.

## Usage

```js
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '@commercetools-frontend/application-components';

const Routes = () => (
  <Routes>
    <Route path="/"><Home /></Route>
    <Route path="/user/*"><User /></Route>
    <Route path="*"><PageNotFound /></Route>
  </Routes>
);
```
