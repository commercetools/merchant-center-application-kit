import React from 'react';
import PropTypes from 'prop-types';
import { customProperties, Text } from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';

// eslint-disable-next-line react/display-name
const renderTitle = (size, title) => {
  switch (size) {
    case 'big':
      return (
        <Text.Headline elementType="h2" title={title} truncate>
          {title}
        </Text.Headline>
      );

    default:
      return (
        <Text.Subheadline elementType="h4" title={title} truncate>
          {title}
        </Text.Subheadline>
      );
  }
};

const renderSubtitle = subtitle => {
  if (!subtitle) {
    return null;
  }
  if (!React.isValidElement(subtitle)) {
    return (
      <Text.Body title={subtitle} truncate>
        {subtitle}
      </Text.Body>
    );
  }
  return subtitle;
};

const ModalPageHeaderTitle = props => {
  const renderedTitle = renderTitle(props.titleSize, props.title);
  const renderedSubtitle = renderSubtitle(props.subtitle);
  return (
    <div
      css={css`
        overflow: hidden;
        & * + * {
          margin-top: ${customProperties.spacingM} !important;
        }
      `}
    >
      {renderedTitle}
      {renderedSubtitle}
    </div>
  );
};
ModalPageHeaderTitle.displayName = 'ModalPageHeaderTitle';
ModalPageHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.oneOf(['big', 'small']),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
ModalPageHeaderTitle.defaultProps = {
  titleSize: 'small',
};

export default ModalPageHeaderTitle;
