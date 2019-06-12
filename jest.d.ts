// The following matchers are part of https://www.npmjs.com/package/@commercetools/jest-enzyme-matchers
declare namespace jest {
  interface Matchers<R> {
    toHaveProp(selector: string): R;
    toRender(selector: string): R;
    toHaveState(selector: string, expected: unknown): R;
  }
}
