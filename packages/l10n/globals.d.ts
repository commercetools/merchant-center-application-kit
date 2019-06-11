export {};
import 'jest-enzyme';

declare module '@commercetools/jest-enzyme-matchers' {
  interface Matchers<R> {
    toHaveProp: (htmlElement: string) => object;
    toHaveState: () => any;
  }

  interface Expect {
    toHaveProp: (htmlElement: string) => object;
    toHaveState: () => any;
  }
}
