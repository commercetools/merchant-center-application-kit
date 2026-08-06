import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabularModalPage } from '@commercetools-frontend/application-components';
import IconButton from '@commercetools-uikit/icon-button';
import {
  BinLinearIcon,
  FlameIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import {
  TabularPageContent,
  TabularPageCustomTitleRow,
  TabularPageTabControls,
} from '../fixtures/tabular-page';
import { CUSTOM_VIEW_LOCATORS } from '../helpers';

const routePath = '/tabular-modal-page';

const TabularModalPageSpec = ({
  children = <TabularPageContent basePath={routePath} />,
  ...props
}: Partial<ComponentProps<typeof TabularModalPage>>) => (
  <TabularModalPage
    isOpen
    title="Lorem ipsum"
    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    onClose={() => undefined}
    // Otherwise `ModalPage` unmounts itself on close and nothing re-opens it.
    shouldDelayOnClose={false}
    tabControls={<TabularPageTabControls basePath={routePath} />}
    {...props}
  >
    {children}
  </TabularModalPage>
);

const FormControls = () => (
  <>
    <TabularModalPage.FormSecondaryButton onClick={() => undefined} />
    <TabularModalPage.FormPrimaryButton onClick={() => undefined} />
    <TabularModalPage.FormDeleteButton onClick={() => undefined} />
  </>
);

const meta: Meta<typeof TabularModalPage> = {
  title: 'Application Components/TabularModalPage',
  component: TabularModalPage,
  parameters: {
    initialEntries: [`${routePath}/tab-one`],
  },
};

export default meta;

type Story = StoryObj<typeof TabularModalPage>;

// Full-viewport overlays can't share a frame, so one export per state.

export const Default: Story = {
  render: () => <TabularModalPageSpec />,
};

export const WithFormControls: Story = {
  render: () => <TabularModalPageSpec formControls={<FormControls />} />,
};

export const WithCustomControls: Story = {
  render: () => (
    <TabularModalPageSpec
      formControls={
        <>
          <IconButton
            label="SearchIcon"
            icon={<SearchIcon />}
            onClick={() => undefined}
          />
          <IconButton
            label="FlameIcon"
            icon={<FlameIcon />}
            onClick={() => undefined}
          />
          <IconButton
            label="BinLinearIcon"
            icon={<BinLinearIcon />}
            onClick={() => undefined}
          />
        </>
      }
    />
  ),
};

export const WithCustomTitleRowAndNoControls: Story = {
  render: () => (
    <TabularModalPageSpec customTitleRow={<TabularPageCustomTitleRow />} />
  ),
};

export const WithCustomTitleRowAndFormControls: Story = {
  render: () => (
    <TabularModalPageSpec
      customTitleRow={<TabularPageCustomTitleRow />}
      formControls={<FormControls />}
    />
  ),
};

export const WithHiddenControls: Story = {
  render: () => (
    <TabularModalPageSpec formControls={<FormControls />} hideControls />
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <TabularModalPageSpec>
      {Array.from({ length: 10 }, (_, index) => (
        <TabularPageContent key={index} basePath={routePath} />
      ))}
    </TabularModalPageSpec>
  ),
};

export const WithCustomViewsSelector: Story = {
  render: () => (
    <TabularModalPageSpec
      customViewLocatorCodes={{
        [CUSTOM_VIEW_LOCATORS.productDetails]: `${routePath}/tab-one`,
      }}
    />
  ),
};
