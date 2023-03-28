# @commercetools-frontend/assets

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/assets"><img src="https://badgen.net/npm/v/@commercetools-frontend/assets" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/assets"><img src="https://badgen.net/npm/v/@commercetools-frontend/assets/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/assets"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/assets" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains various assets that can be used in Merchant Center Custom Applications.

## Install

```bash
$ npm install --save @commercetools-frontend/assets
```

## Using SVG images

The `images` folder contains SVG images to be imported and used as `<img src>` URLs.

```js
import React from 'react';
// Import requires a bundler to deal with SVG files
import HourglassIllustration from '@commercetools-frontend/assets/images/hourglass.svg';

const Component = () => (
  <div>
    <img src={HourglassIllustration} />
  </div>
);
```
