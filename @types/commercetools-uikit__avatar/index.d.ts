declare module '@commercetools-uikit/avatar' {
  import * as React from 'react';

  export const version: string;

  // <Avatar>
  export type AvatarProps = {
    firstName: string;
    lastName: string;
    gravatarHash: string;
    isHighlighted: boolean;
    size: 's' | 'm' | 'l';
    children?: never;
  };
  const Avatar: {
    (props: AvatarProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      AvatarProps,
      'firstName' | 'lastName' | 'isHighlighted' | 'size'
    >;
  };
  export default Avatar;
}
