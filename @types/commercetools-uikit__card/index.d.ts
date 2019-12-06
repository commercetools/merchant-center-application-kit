declare module '@commercetools-uikit/card' {
  import * as React from 'react';

  export const version: string;

  // <Card>
  export type CardProps = {
    className?: string;
    type: 'raised' | 'flat';
    theme: 'light' | 'dark';
    children: React.ReactNode;
  };
  const Card: {
    (props: CardProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<CardProps, 'type' | 'theme'>;
  };
  export default Card;
}
