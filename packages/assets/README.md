# @commercetools-frontend/assets

This package contains image assets that can be used in the creation of Merchant Center applications. All of the assets are available as base64 encoded strings, as named exports, and can be found listed in `index.js`. These are used within the package `application-shell`. The images can also be used directly, from the `images` folder.

## Usage

```js
import React from 'react';
// Named export - without the need for a bundler and appropriate loader
import { CTLogo } from '@commercetools-frontend/assets';
// Direct import requires a bundler to deal with SVG files
import Fly from '@commercetools-frontend/assets/images/orders/fly.svg';

const Component = () => (
  <div>
    <img src={Fly} />
    <img src={CTLogo} />
  </div>
);
```

## Install

```bash
$ npm install --save @commercetools-frontend/assets
```
