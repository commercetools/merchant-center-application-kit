declare type Styles = {
  global: string;
  jsonMap: typeof import('./compiled/navbar.css.json').default;
};

declare const styles: Styles;
export default styles;
