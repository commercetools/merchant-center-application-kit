---
"@commercetools-frontend/babel-preset-mc-app": minor
"@commercetools-frontend/eslint-config-mc-app": minor
"@commercetools-frontend/jest-preset-mc-app": minor
"@commercetools-frontend/mc-scripts": minor
---

feat: adds the ability to opt into the new `automatic` JSX runtime

Recent React versions support a new JSX runtime. Read more about it [here](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). 

You may opt into the new runtime in `automatic` mode by setting the `ENABLE_NEW_JSX_TRANSFORM` environment variable to `true`. Please note you need at least React v17 or v16.14 in your application. 
Opting into the new JSX transform automatically also changes the Babel, Jest and ESLint configurations. As a conssequence ESLint will warn whenever it discovers React being in scope by importing it as `import React from 'react`'. You have to remove those imports using the respective codemod by running `npx react-codemod update-react-imports`.

Lastly, all code of the Merchant Center Application Kit will continue to be bundled in `classic` mode to support older versions of React.
