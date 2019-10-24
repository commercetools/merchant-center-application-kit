import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  customProperties,
  Tooltip,
  IconButton,
  CodeViewIcon,
} from '@commercetools-frontend/ui-kit';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { colors } from '../design-system';

const TooltipWrapperComponent = styled.div`
  /* default z-index for dialogs is 1000 */
  z-index: 1001;
`;
const PlaygroundContainer = styled.div`
  background-color: ${colors.light.surfaceSecondary1};
  border: 4px solid ${colors.light.borderPrimary};
  border-radius: ${customProperties.borderRadius4};
`;
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  background-color: ${colors.light.surfacePrimary};
  border-radius: ${customProperties.borderRadius4}
    ${customProperties.borderRadius4} 0 0;
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
        <Spacings.Inset scale="s">
          <Spacings.Inline>
            <Tooltip
              position="top"
              title="Enter playground mode"
              components={{
                TooltipWrapperComponent,
              }}
            >
              <IconButton
                icon={<CodeViewIcon />}
                label="Enter playground mode"
                onClick={() => setIsFullscreen(true)}
              />
            </Tooltip>
          </Spacings.Inline>
        </Spacings.Inset>
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
