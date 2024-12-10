import { isValidElement, type ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';

type TTitleSize = 'big' | 'medium' | 'small';

type Props = {
  title: string;
  titleSize?: TTitleSize;
  truncate?: boolean;
  subtitle?: string | ReactElement;
  children?: never;
};

const SubtitleWrapper = styled.div`
  margin-top: ${uiKitDesignTokens.spacing20};
`;

type TitleProps = Pick<Props, 'titleSize' | 'title' | 'truncate'>;

const Title = (props: TitleProps) => {
  switch (props.titleSize) {
    case 'big':
      return (
        <Text.Headline as="h1" title={props.title} truncate={props.truncate}>
          {props.title}
        </Text.Headline>
      );
    case 'medium':
      return (
        <Text.Headline as="h2" title={props.title} truncate={props.truncate}>
          {props.title}
        </Text.Headline>
      );

    default:
      return (
        <Text.Subheadline as="h4" title={props.title} truncate={props.truncate}>
          {props.title}
        </Text.Subheadline>
      );
  }
};

type SubtitleProps = {
  subtitle?: Props['subtitle'];
  truncate?: Props['truncate'];
};

const Subtitle = ({ truncate = false, ...props }: SubtitleProps) => {
  if (!props.subtitle) {
    return null;
  }
  if (isValidElement(props.subtitle)) {
    return <SubtitleWrapper>{props.subtitle}</SubtitleWrapper>;
  }
  return (
    <SubtitleWrapper>
      <Text.Body
        title={typeof props.subtitle === 'string' ? props.subtitle : undefined}
        truncate={truncate}
        tone="secondary"
      >
        {props.subtitle}
      </Text.Body>
    </SubtitleWrapper>
  );
};

const PageHeaderTitle = ({
  titleSize = 'small',
  truncate = false,
  ...props
}: Props) => (
  <div
    css={css`
      overflow: hidden;
    `}
  >
    <Title title={props.title} titleSize={titleSize} truncate={truncate} />
    <Subtitle subtitle={props.subtitle} truncate={truncate} />
  </div>
);
PageHeaderTitle.displayName = 'PageHeaderTitle';

export default PageHeaderTitle;
