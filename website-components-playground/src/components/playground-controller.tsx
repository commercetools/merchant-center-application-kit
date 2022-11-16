import { useLayoutEffect, useState, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { AngleRightIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { customProperties } from '@commercetools-uikit/design-system';
import IntlController from './intl-controller';
import KnobsController, { type TKnob } from './knobs-controller';

type TPlaygroundControllerFunctionOptions = {
  values: Record<string, unknown>;
};
type TPlaygroundControllerProps = {
  knobs: TKnob[];
  children: (options: TPlaygroundControllerFunctionOptions) => ReactNode;
};

const PlaygroundContainer = styled.div`
  background-color: ${customProperties.colorNeutral95};
  border: 16px solid ${customProperties.colorNeutral95};
  border-radius: ${customProperties.borderRadius6};
`;
const PreviewContainer = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${(props) => props.height};
  background-color: ${customProperties.colorSurface};
  border-radius: ${customProperties.borderRadius4}
    ${customProperties.borderRadius4} 0 0;
  border-bottom: 1px solid ${customProperties.colorNeutral90};
`;

const PlaygroundController = (props: TPlaygroundControllerProps) => {
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

export default PlaygroundController;
