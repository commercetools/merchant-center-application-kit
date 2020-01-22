declare namespace jest {
  interface Matchers<R, T> {
    toHaveTextContent(selector: string): R;
    // The following matchers are part of https://www.npmjs.com/package/@commercetools/jest-enzyme-matchers
    toHaveProp(selector: string, expected?: unknown): R;
    toRender(selector: string): R;
    toRender(component: React.ComponentType): R;
    toHaveState(selector: string, expected: unknown): R;
    // The following matchers are part of https://www.npmjs.com/package/jest-dom
    toHaveText(selector: string): R;
  }
}
