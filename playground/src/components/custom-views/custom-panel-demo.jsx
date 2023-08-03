import { useState } from 'react';
import {
  CustomPanel,
  useModalState,
} from '@commercetools-frontend/application-components';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

function CustomPanelDemo() {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [panelSize, setPanelSize] = useState('');
  return (
    <Spacings.Inset>
      <Spacings.Stack scale="l">
        <Text.Headline as="h1">Custom Views - Custom Panel</Text.Headline>

        <Spacings.Stack scale="m">
          <Spacings.Inline>
            <SecondaryButton
              label="Open large Custom Panel"
              onClick={() => {
                setPanelSize('large');
                openModal();
              }}
            />
          </Spacings.Inline>

          <Spacings.Inline>
            <SecondaryButton
              label="Open small Custom Panel"
              onClick={() => {
                setPanelSize('small');
                openModal();
              }}
            />
          </Spacings.Inline>
        </Spacings.Stack>

        {isModalOpen && (
          <CustomPanel
            title="Custom Panel"
            size={panelSize}
            onClose={() => closeModal()}
          >
            <p>This is the Custom Panel content</p>
          </CustomPanel>
        )}
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default CustomPanelDemo;
