import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AngleRightIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { designTokens } from '@commercetools-uikit/design-system';
import IntlController from './intl-controller';
import KnobsController from './knobs-controller';

const PlaygroundContainer = styled.div`
  background-color: ${designTokens.colorNeutral95};
  border: 16px solid ${designTokens.colorNeutral95};
  border-radius: ${designTokens.borderRadius6};
`;
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${(props) => props.height};
  background-color: ${designTokens.colorSurface};
  border-radius: ${designTokens.borderRadius4} ${designTokens.borderRadius4} 0 0;
  border-bottom: 1px solid ${designTokens.colorNeutral90};
`;

const PlaygroundController = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isPanelOpen]);
  return (
    <IntlController>
      {(intlProps) => (
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
