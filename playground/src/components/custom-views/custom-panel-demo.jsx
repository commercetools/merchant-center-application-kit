import { useState } from 'react';
import { CustomPanelContainer } from '@commercetools-frontend/application-components';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

function CustomPanelDemo() {
  const [isOpen, setIsOpen] = useState(false);
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
                setIsOpen(true);
              }}
            />
          </Spacings.Inline>

          <Spacings.Inline>
            <SecondaryButton
              label="Open small Custom Panel"
              onClick={() => {
                setPanelSize('small');
                setIsOpen(true);
              }}
            />
          </Spacings.Inline>
        </Spacings.Stack>

        {isOpen && (
          <CustomPanelContainer
            title="Custom Panel"
            size={panelSize}
            onClose={() => setIsOpen(false)}
          >
            <p>This is the Custom Panel content</p>
          </CustomPanelContainer>
        )}
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default CustomPanelDemo;
