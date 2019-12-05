declare module '@commercetools-uikit/spacings' {
  import * as React from 'react';

  export const version: string;

  // <Spacings.Stack>
  export type SpacingsStackProps = {
    scale: 'xs' | 's' | 'm' | 'l' | 'xl';
    alignItems:
      | 'stretch'
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'flexStart'
      | 'flexEnd';
    children: React.ReactNode;
  };
  export const SpacingsStack: {
    (props: SpacingsStackProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<SpacingsStackProps, 'scale' | 'alignItems'>;
  };

  // <Spacings.Inline>
  export type SpacingsInlineProps = {
    scale: 'xs' | 's' | 'm' | 'l' | 'xl';
    alignItems:
      | 'stretch'
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'flexStart'
      | 'flexEnd';
    justifyContent:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    children: React.ReactNode;
  };
  export const SpacingsInline: {
    (props: SpacingsInlineProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      SpacingsInlineProps,
      'scale' | 'alignItems' | 'justifyContent'
    >;
  };

  // <Spacings.Inset>
  export type SpacingsInsetProps = {
    scale: 'xs' | 's' | 'm' | 'l' | 'xl';
    children: React.ReactNode;
  };
  export const SpacingsInset: {
    (props: SpacingsInsetProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<SpacingsInsetProps, 'scale'>;
  };

  // <Spacings.InsetSquish>
  export type SpacingsInsetSquishProps = {
    scale: 's' | 'm' | 'l';
    children: React.ReactNode;
  };
  export const SpacingsInsetSquish: {
    (props: SpacingsInsetSquishProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<SpacingsInsetSquishProps, 'scale'>;
  };

  const Spacings: {
    Stack: typeof SpacingsStack;
    Inline: typeof SpacingsInline;
    Inset: typeof SpacingsInset;
    InsetSquish: typeof SpacingsInsetSquish;
  };
  export default Spacings;
}
