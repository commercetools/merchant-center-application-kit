import { isValidElement, type ReactElement } from 'react';
import { customProperties } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  titleSize: 'big' | 'small';
  truncate: boolean;
  subtitle?: string | ReactElement;
  children?: never;
};
const defaultProps: Pick<Props, 'titleSize' | 'truncate'> = {
  titleSize: 'small',
  truncate: true,
};

const SubtitleWrapper = styled.div`
  margin-top: ${customProperties.spacingM};
`;

type RenderTitleProps = Pick<Props, 'titleSize' | 'title' | 'truncate'>;

const renderTitle = (props: RenderTitleProps) => {
  switch (props.titleSize) {
    case 'big':
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

const renderSubtitle = (subtitle?: Props['subtitle']) => {
  if (!subtitle) {
    return null;
  }
  if (isValidElement(subtitle)) {
    return <SubtitleWrapper>{subtitle}</SubtitleWrapper>;
  }
  return (
    <SubtitleWrapper>
      <Text.Body title={subtitle} truncate>
        {subtitle}
      </Text.Body>
    </SubtitleWrapper>
  );
};

const PageHeaderTitle = (props: Props) => {
  const { titleSize, title, truncate } = props;
  const renderedTitle = renderTitle({ titleSize, title, truncate });
  const renderedSubtitle = renderSubtitle(props.subtitle);
  return (
    <div
      css={css`
        overflow: hidden;
      `}
    >
      {renderedTitle}
      {renderedSubtitle}
    </div>
  );
};
PageHeaderTitle.displayName = 'PageHeaderTitle';
PageHeaderTitle.defaultProps = defaultProps;

export default PageHeaderTitle;
