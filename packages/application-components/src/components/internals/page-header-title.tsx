import { isValidElement, type ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../theming';
import Text from '@commercetools-uikit/text';

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

const renderSubtitle = (
  subtitle?: Props['subtitle'],
  truncate: Props['truncate'] = false
) => {
  if (!subtitle) {
    return null;
  }
  if (isValidElement(subtitle)) {
    return <SubtitleWrapper>{subtitle}</SubtitleWrapper>;
  }
  return (
    <SubtitleWrapper>
      <Text.Body title={subtitle} truncate={truncate}>
        {subtitle}
      </Text.Body>
    </SubtitleWrapper>
  );
};

const PageHeaderTitle = (props: Props) => {
  const { titleSize, title, truncate } = props;
  const renderedTitle = renderTitle({ titleSize, title, truncate });
  const renderedSubtitle = renderSubtitle(props.subtitle, truncate);
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
