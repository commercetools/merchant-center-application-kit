import { isValidElement, type ReactElement } from 'react';
import { customProperties } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  titleSize: 'big' | 'small';
  subtitle?: string | ReactElement;
  children?: never;
};
const defaultProps: Pick<Props, 'titleSize'> = {
  titleSize: 'small',
};

const SubtitleWrapper = styled.div`
  margin-top: ${customProperties.spacingM};
`;

const renderTitle = (size: Props['titleSize'], title: Props['title']) => {
  switch (size) {
    case 'big':
      return (
        <Text.Headline as="h2" title={title} truncate>
          {title}
        </Text.Headline>
      );

    default:
      return (
        <Text.Subheadline as="h4" title={title} truncate>
          {title}
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
  const renderedTitle = renderTitle(props.titleSize, props.title);
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
