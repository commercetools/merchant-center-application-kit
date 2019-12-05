declare module '@commercetools-uikit/text' {
  import * as React from 'react';
  import { MessageDescriptor } from 'react-intl';

  export const version: string;

  // <Text.Headline>
  export type TextHeadlineProps = {
    as: 'h1' | 'h2' | 'h3';
    title?: string;
    truncate?: boolean;
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const TextHeadline: {
    (props: TextHeadlineProps): JSX.Element;
    displayName: string;
  };

  // <Text.Subeadline>
  export type TextSubeadlineProps = {
    as: 'h4' | 'h5';
    title?: string;
    truncate?: boolean;
    isBold?: boolean;
    tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const TextSubheadline: {
    (props: TextSubeadlineProps): JSX.Element;
    displayName: string;
  };

  // <Text.Wrap>
  export type TextWrapProps = {
    title?: string;
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const TextWrap: {
    (props: TextWrapProps): JSX.Element;
    displayName: string;
  };

  // <Text.Body>
  export type TextBodyProps = {
    as: 'span' | 'p';
    title?: string;
    truncate?: boolean;
    isBold?: boolean;
    isItalic?: boolean;
    tone?:
      | 'primary'
      | 'secondary'
      | 'information'
      | 'positive'
      | 'negative'
      | 'inverted';
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const TextBody: {
    (props: TextBodyProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<TextBodyProps, 'as'>;
  };

  // <Text.Detail>
  export type TextDetailProps = {
    title?: string;
    truncate?: boolean;
    isBold?: boolean;
    isItalic?: boolean;
    isInline?: boolean;
    tone?:
      | 'primary'
      | 'secondary'
      | 'information'
      | 'positive'
      | 'negative'
      | 'warning'
      | 'inverted';
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const TextDetail: {
    (props: TextDetailProps): JSX.Element;
    displayName: string;
  };

  const Text: {
    Headline: typeof TextHeadline;
    Subheadline: typeof TextSubheadline;
    Wrap: typeof TextWrap;
    Body: typeof TextBody;
    Detail: typeof TextDetail;
  };
  export default Text;
}
