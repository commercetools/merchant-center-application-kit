/// <reference types="@commercetools-frontend/application-config/client" />

// Patch for Jest types using a depreacted type declaration for NodeJS.Global,
// as it's been removed from Node > v16.
// https://github.com/facebook/jest/issues/11640#issuecomment-893867514
declare module NodeJS {
  interface Global {}
}
