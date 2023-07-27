<<<<<<< HEAD
import { useMemo, useState } from 'react';
import {
  CustomViewLoader,
  useModalState,
} from '@commercetools-frontend/application-components';
||||||| parent of b4af45c03 (refactor(application-components): rename custom-panel export name)
import { useState } from 'react';
import { CustomPanelContainer } from '@commercetools-frontend/application-components';
=======
import { useState } from 'react';
import { CustomPanel } from '@commercetools-frontend/application-components';
>>>>>>> b4af45c03 (refactor(application-components): rename custom-panel export name)
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

export const CUSTOM_VIEW_ID = '290f83df-d86d-417c-ab24-41697e33483c';

const DEMO_CUSTOM_VIEW = {
  id: CUSTOM_VIEW_ID,
  defaultLabel: 'Demo Custom View',
  labelAllLocales: {},
  url: `http://localhost:3001/custom-view/${CUSTOM_VIEW_ID}`,
  type: 'CustomPanel',
  typeConfig: {
    size: 'SMALL',
  },
  locators: ['/almond-40/app-kit-playground/custom-panel'],
  permissions: [
    {
      name: 'ViewProducts',
      oAuthScopes: ['view_products'],
    },
  ],
};

function CustomPanelDemo() {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [panelSize, setPanelSize] = useState('');
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
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default CustomPanelDemo;
