type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.mod.css' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
