declare type Styles = {
  global: string;
  jsonMap: typeof import('./compiled/navbar.css.json');
};

declare const styles: Styles;
export default styles;
