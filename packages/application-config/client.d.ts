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
declare module '*.react.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
