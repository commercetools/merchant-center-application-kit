import React from 'react';
import { customProperties } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  titleSize: 'big' | 'small';
  subtitle?: string | React.ReactElement;
  children?: never;
};
const defaultProps: Pick<Props, 'titleSize'> = {
  titleSize: 'small',
};

const SubtitleWrapper = styled.div`
  margin-top: ${customProperties.spacingM};
`;

// eslint-disable-next-line react/display-name
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
  if (React.isValidElement(subtitle)) {
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

const ModalPageHeaderTitle = (props: Props) => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const renderedTitle = renderTitle(props.titleSize, props.title);
  // eslint-disable-next-line testing-library/render-result-naming-convention
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
ModalPageHeaderTitle.displayName = 'ModalPageHeaderTitle';
ModalPageHeaderTitle.defaultProps = defaultProps;

export default ModalPageHeaderTitle;
