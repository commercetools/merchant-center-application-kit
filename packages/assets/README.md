# @commercetools-frontend/assets

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/assets"><img src="https://badgen.net/npm/v/@commercetools-frontend/assets" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/assets"><img src="https://badgen.net/npm/v/@commercetools-frontend/assets/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/assets"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/assets" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains image assets that can be used in the creation of Merchant Center applications. These are used within the package `application-shell`. The images can be used directly, from the `images` folder.

## Usage

```js
import React from 'react';
// Import requires a bundler to deal with SVG files
import ProjectExpired from '@commercetools-frontend/assets/images/project-expired.svg';

const Component = () => (
  <div>
    <img src={ProjectExpired} />
  </div>
);
```

## Install

```bash
$ npm install --save @commercetools-frontend/assets
```
