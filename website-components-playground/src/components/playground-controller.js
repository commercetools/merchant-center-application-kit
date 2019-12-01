import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Spacings,
  IconButton,
  Text,
  AngleRightIcon,
  AngleDownIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import IntlController from './intl-controller';
import KnobsController from './knobs-controller';

const PlaygroundContainer = styled.div`
  background-color: ${customProperties.colorNeutral95};
  border: 16px solid ${customProperties.colorNeutral95};
  border-radius: ${customProperties.borderRadius6};
`;
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  background-color: ${customProperties.colorSurface};
  border-radius: ${customProperties.borderRadius4}
    ${customProperties.borderRadius4} 0 0;
  border-bottom: 1px solid ${customProperties.colorNeutral90};
`;

const PlaygroundController = props => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  React.useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isPanelOpen]);
  return (
    <IntlController>
      {intlProps => (
        <KnobsController knobs={props.knobs} {...intlProps}>
          {({ form, values }) => (
            <PlaygroundContainer>
              <Spacings.Stack scale="s">
                <PreviewContainer height="400px">
                  {props.children({ values })}
                </PreviewContainer>
                <Spacings.Inline alignItems="center">
                  <IconButton
                    size="medium"
                    icon={isPanelOpen ? <AngleDownIcon /> : <AngleRightIcon />}
                    label="Toggle interactive controls"
                    onClick={togglePanel}
                  />
                  <Text.Body isBold={true}>{'Interactive controls'}</Text.Body>
                </Spacings.Inline>
                {isPanelOpen && <div>{form}</div>}
              </Spacings.Stack>
            </PlaygroundContainer>
          )}
        </KnobsController>
      )}
    </IntlController>
  );
};
PlaygroundController.propTypes = {
  knobs: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.oneOf(['text', 'text-multi', 'select']).isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      initialValue: PropTypes.any.isRequired,
      valueOptions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired
  ).isRequired,
  children: PropTypes.func.isRequired,
};

export default PlaygroundController;
