import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Tooltip } from '@commercetools-frontend/ui-kit';
import { InfoDialog } from '@commercetools-frontend/application-components';
import UnstyledCodeViewIcon from '@commercetools-docs/gatsby-theme-docs/src/icons/code-view-icon.svg';
import {
  createStyledIcon,
  IconButton,
  Spacings,
  designSystem,
} from '@commercetools-docs/gatsby-theme-docs';

const CodeViewIcon = createStyledIcon(UnstyledCodeViewIcon);

const TooltipWrapperComponent = styled.div`
  /* default z-index for dialogs is 1000 */
  z-index: 1001;
`;
const PlaygroundContainer = styled.div`
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  border: 4px solid ${designSystem.colors.light.borderPrimary};
  border-radius: ${designSystem.tokens.borderRadius4};
`;
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-radius: ${designSystem.tokens.borderRadius4}
    ${designSystem.tokens.borderRadius4} 0 0;
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
`;

const getIframeUrl = (urlPath, isFullScreen = false) => {
  const fullScreenPath = isFullScreen ? '/fullscreen' : '';
  if (process.env.NODE_ENV === 'production') {
    return withPrefix(`/playground/${urlPath}${fullScreenPath}`);
  }
  return `http://localhost:8001/${urlPath}${fullScreenPath}`;
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
            padding: ${designSystem.dimensions.spacings.s};
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
            src={getIframeUrl(props.urlPath, true)}
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
