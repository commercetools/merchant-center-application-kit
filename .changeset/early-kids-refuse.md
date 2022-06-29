---
'merchant-center-application-template-starter-typescript': minor
'@commercetools-frontend/create-mc-app': minor
'merchant-center-application-template-starter': minor
---

There is a new starter template to develop Custom Applications in TypeScript!

To install it via the `@commercetools-frontend/create-mc-app` CLI:

```bash
$ npx @commercetools-frontend/create-mc-app@latest <folder_name> \
  --template starter-typescript
```

The TypeScript starter template is the same as the standard JS starter template in terms of functionality
but it includes the additional TypeScript setup.

If you already have a Custom Application in TypeScript or are planning to migrate an existing one to it
we recommend to take a look at the tooling setup of the TypeScript starter template, in particular:

- `.prettierrc` for using the `typescript` parser.
- `jest.*.config.js` to include the file extensions `.ts` and `.tsx`.
- `tsconfig.json`
