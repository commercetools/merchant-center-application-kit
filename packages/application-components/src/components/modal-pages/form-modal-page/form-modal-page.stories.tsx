import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormPageEmailField, FormPageValues } from '../../form-page-fixtures';
import FormModalPage from './form-modal-page';

const longTitle =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const longSubtitle =
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const FormModalPageSpec = (
  props: Partial<ComponentProps<typeof FormModalPage>>
) => (
  <FormPageValues>
    <FormModalPage
      isOpen
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      onClose={() => undefined}
      onSecondaryButtonClick={() => undefined}
      onPrimaryButtonClick={() => undefined}
      // Otherwise `ModalPage` unmounts itself on close and nothing re-opens it.
      shouldDelayOnClose={false}
      {...props}
    >
      <FormPageEmailField />
    </FormModalPage>
  </FormPageValues>
);

const meta: Meta<typeof FormModalPage> = {
  title: 'Application Components/FormModalPage',
  component: FormModalPage,
};

export default meta;

type Story = StoryObj<typeof FormModalPage>;

// Full-viewport overlays can't share a frame, so one export per state.

export const Default: Story = {
  render: () => <FormModalPageSpec />,
};

export const PrimaryButtonDisabled: Story = {
  render: () => <FormModalPageSpec isPrimaryButtonDisabled />,
};

export const SecondaryButtonDisabled: Story = {
  render: () => <FormModalPageSpec isSecondaryButtonDisabled />,
};

export const LongTitleAndSubtitle: Story = {
  render: () => <FormModalPageSpec title={longTitle} subtitle={longSubtitle} />,
};

export const HiddenControls: Story = {
  render: () => <FormModalPageSpec hideControls />,
};

export const WithCustomViewsSelector: Story = {
  render: () => (
    <FormModalPageSpec
      customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
    />
  ),
};
