declare namespace jest {
  interface Matchers<R> {
    toHaveProp(selector: string): void;
    toRender(selector: string): void;
    toHaveState(selector: string, arg2: any): void;
  }
}
