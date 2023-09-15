import { useMemo, useState } from 'react';
import { useModalState } from '@commercetools-frontend/application-components';
import {
  CustomViewLoader,
  TCustomViewSize,
} from '@commercetools-frontend/application-shell';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { DEMO_CUSTOM_VIEW } from './constants';

function CustomPanelDemo() {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [panelSize, setPanelSize] = useState(TCustomViewSize.Small);
  const customView = useMemo(
    () => ({
      ...DEMO_CUSTOM_VIEW,
      typeSettings: {
        size: panelSize,
      },
    }),
    [panelSize]
  );

  return (
    <Spacings.Inset>
      <Spacings.Stack scale="l">
        <Text.Headline as="h1">Custom Views - Custom Panel</Text.Headline>

        <Spacings.Stack scale="m">
          <Spacings.Inline>
            <SecondaryButton
              label="Open large Custom Panel"
              onClick={() => {
                setPanelSize(TCustomViewSize.Large);
                openModal();
              }}
            />
          </Spacings.Inline>

          <Spacings.Inline>
            <SecondaryButton
              label="Open small Custom Panel"
              onClick={() => {
                setPanelSize(TCustomViewSize.Small);
                openModal();
              }}
            />
          </Spacings.Inline>
        </Spacings.Stack>

        {isModalOpen && (
          <CustomViewLoader
            customView={customView}
            onClose={() => closeModal()}
          />
        )}
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default CustomPanelDemo;
