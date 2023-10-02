import { useMemo, useState } from 'react';
import {
  InfoMainPage,
  useModalState,
} from '@commercetools-frontend/application-components';
import { CustomViewLoader } from '@commercetools-frontend/application-shell';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import { DEMO_CUSTOM_VIEW } from './constants';

function CustomPanelDemo() {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [panelSize, setPanelSize] = useState('SMALL');
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
    <InfoMainPage
      title="Custom Views - Custom Panel"
      customViewLocatorCode="products.product_details.general"
      onPreviousPathClick={() => false}
    >
      <Spacings.Stack scale="m">
        <Spacings.Inline>
          <SecondaryButton
            label="Open large Custom Panel"
            onClick={() => {
              setPanelSize('LARGE');
              openModal();
            }}
          />
        </Spacings.Inline>

        <Spacings.Inline>
          <SecondaryButton
            label="Open small Custom Panel"
            onClick={() => {
              setPanelSize('SMALL');
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
    </InfoMainPage>
  );
}

export default CustomPanelDemo;
