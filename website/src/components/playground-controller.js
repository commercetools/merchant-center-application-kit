import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Tooltip } from '@commercetools-frontend/ui-kit';
import { InfoDialog } from '@commercetools-frontend/application-components';
import UnstyledCodeViewIcon from '@commercetools-docs/gatsby-theme-docs/src/images/icons/code-view-icon.svg';
import {
  colors,
  dimensions,
  tokens,
} from '@commercetools-docs/gatsby-theme-docs/src/design-system';
import createStyledIcon from '@commercetools-docs/gatsby-theme-docs/src/utils/create-styled-icon';
import {
  IconButton,
  Spacings,
} from '@commercetools-docs/gatsby-theme-docs/src/components';

const CodeViewIcon = createStyledIcon(UnstyledCodeViewIcon);

const TooltipWrapperComponent = styled.div`
  /* default z-index for dialogs is 1000 */
  z-index: 1001;
`;
const PlaygroundContainer = styled.div`
  background-color: ${colors.light.surfaceSecondary1};
  border: 4px solid ${colors.light.borderPrimary};
  border-radius: ${tokens.borderRadius4};
`;
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  background-color: ${colors.light.surfacePrimary};
  border-radius: ${tokens.borderRadius4} ${tokens.borderRadius4} 0 0;
  border-bottom: 1px solid ${colors.light.borderPrimary};
`;

const getIframeUrl = urlPath => {
  if (process.env.NODE_ENV === 'production') {
    return withPrefix(`/playground/${urlPath}`);
  }
  return `http://localhost:8001/${urlPath}`;
};

const PlaygroundController = props => {
  const [isFullScreen, setIsFullscreen] = React.useState(false);
  return (
    <>
      <PlaygroundContainer>
        <PreviewContainer height="400px">
          <iframe
            src={getIframeUrl(props.urlPath)}
            height="400px"
            width="100%"
          />
        </PreviewContainer>
        <div
          css={css`
            padding: ${dimensions.spacings.s};
          `}
        >
          <Spacings.Inline>
            <Tooltip
              placement="top"
              title="Enter playground mode"
              components={{
                TooltipWrapperComponent,
              }}
            >
              <IconButton
                icon={<CodeViewIcon color="textPrimary" />}
                label="Enter playground mode"
                onClick={() => setIsFullscreen(true)}
              />
            </Tooltip>
          </Spacings.Inline>
        </div>
      </PlaygroundContainer>

      <InfoDialog
        title="Playground"
        size="scale"
        isOpen={isFullScreen}
        zIndex={1100}
        onClose={() => setIsFullscreen(false)}
        getParentSelector={() => document.body}
      >
        <div
          css={css`
            overflow: hidden;
            height: 100%;
          `}
        >
          <iframe
            src={`${getIframeUrl(props.urlPath)}?mode=fullscreen`}
            height="100%"
            width="100%"
          />
        </div>
      </InfoDialog>
    </>
  );
};
PlaygroundController.propTypes = {
  urlPath: PropTypes.string.isRequired,
};

export default PlaygroundController;
