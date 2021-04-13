declare namespace jest {
  interface Matchers<R, T> {
    toHaveTextContent(selector: string): R;
  }
}
