import { isValidElement, type ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { designTokens as appKitDesignTokens } from '../../theming';

type Props = {
  title: string;
  titleSize: 'big' | 'small';
  truncate: boolean;
  subtitle?: string | ReactElement;
  children?: never;
};
const defaultProps: Pick<Props, 'titleSize' | 'truncate'> = {
  titleSize: 'small',
  truncate: false,
};

const SubtitleWrapper = styled.div`
  margin-top: ${appKitDesignTokens.marginTopForPageSubtitle};
`;

type TitleProps = Pick<Props, 'titleSize' | 'title' | 'truncate'>;

const Title = (props: TitleProps) => {
  const { themedValue } = useTheme();
  switch (props.titleSize) {
    case 'big':
      return (
        <Text.Headline
          as={themedValue('h2', 'h1')}
          title={props.title}
          truncate={props.truncate}
        >
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
  truncate: Props['truncate'];
};

const Subtitle = (props: SubtitleProps) => {
  const { themedValue } = useTheme();
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
        truncate={props.truncate}
        tone={themedValue(undefined, 'secondary')}
      >
        {props.subtitle}
      </Text.Body>
    </SubtitleWrapper>
  );
};
Subtitle.defaultProps = {
  truncate: false,
};

const PageHeaderTitle = (props: Props) => (
  <div
    css={css`
      overflow: hidden;
    `}
  >
    <Title
      title={props.title}
      titleSize={props.titleSize}
      truncate={props.truncate}
    />
    <Subtitle subtitle={props.subtitle} truncate={props.truncate} />
  </div>
);
PageHeaderTitle.displayName = 'PageHeaderTitle';
PageHeaderTitle.defaultProps = defaultProps;

export default PageHeaderTitle;
