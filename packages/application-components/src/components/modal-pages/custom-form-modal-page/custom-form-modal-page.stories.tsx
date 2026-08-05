import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from '@commercetools-uikit/icon-button';
import {
  BinLinearIcon,
  FlameIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import { FormPageEmailField, FormPageValues } from '../../form-page-fixtures';
import CustomFormModalPage from './custom-form-modal-page';

const CustomFormModalPageSpec = (
  props: Partial<ComponentProps<typeof CustomFormModalPage>>
) => (
  <FormPageValues>
    <CustomFormModalPage
      isOpen
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      onClose={() => undefined}
      // Otherwise `ModalPage` unmounts itself on close and nothing re-opens it.
      shouldDelayOnClose={false}
      {...props}
    >
      <FormPageEmailField />
    </CustomFormModalPage>
  </FormPageValues>
);

const FormControls = () => (
  <>
    <CustomFormModalPage.FormSecondaryButton onClick={() => undefined} />
    <CustomFormModalPage.FormPrimaryButton onClick={() => undefined} />
    <CustomFormModalPage.FormDeleteButton onClick={() => undefined} />
  </>
);

const meta: Meta<typeof CustomFormModalPage> = {
  title: 'Application Components/CustomFormModalPage',
  component: CustomFormModalPage,
};

export default meta;

type Story = StoryObj<typeof CustomFormModalPage>;

// Full-viewport overlays can't share a frame, so one export per state.

export const Default: Story = {
  render: () => <CustomFormModalPageSpec />,
};

export const WithFormControls: Story = {
  render: () => <CustomFormModalPageSpec formControls={<FormControls />} />,
};

export const WithCustomControls: Story = {
  render: () => (
    <CustomFormModalPageSpec
      formControls={
        <>
          <IconButton
            label="Search"
            icon={<SearchIcon />}
            onClick={() => undefined}
          />
          <IconButton
            label="Update"
            icon={<FlameIcon />}
            onClick={() => undefined}
          />
          <IconButton
            label="Delete"
            icon={<BinLinearIcon />}
            onClick={() => undefined}
          />
        </>
      }
    />
  ),
};

export const WithHiddenControls: Story = {
  render: () => (
    <CustomFormModalPageSpec formControls={<FormControls />} hideControls />
  ),
};

export const WithCustomViewsSelector: Story = {
  render: () => (
    <CustomFormModalPageSpec
      customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
      formControls={<FormControls />}
    />
  ),
};
