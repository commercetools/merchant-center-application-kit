import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS, VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RevertIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import FormMainPage from './form-main-page';

const FormMainPageSpec = (
  props: Partial<ComponentProps<typeof FormMainPage>>
) => (
  // `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor.
  <div style={{ height: '500px' }}>
    <FormMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      labelPrimaryButton="Save"
      labelSecondaryButton="Revert changes"
      iconLeftSecondaryButton={<RevertIcon />}
      onSecondaryButtonClick={() => undefined}
      onPrimaryButtonClick={() => undefined}
      {...props}
    >
      <Spacings.Stack scale="l">
        <Spacings.Inline scale="l">
          <TextField
            title="First Name"
            value="foo"
            onChange={() => undefined}
          />
          <TextField title="Last Name" value="foo" onChange={() => undefined} />
        </Spacings.Inline>
        <TextField
          title="Email Address"
          value="foo"
          onChange={() => undefined}
        />
        <TextField
          title="Business Role"
          value="foo"
          onChange={() => undefined}
        />
      </Spacings.Stack>
    </FormMainPage>
  </div>
);

const meta: Meta<typeof FormMainPage> = {
  title: 'Application Components/FormMainPage',
  component: FormMainPage,
};

export default meta;

type Story = StoryObj<typeof FormMainPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="FormMainPage">
        <FormMainPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormMainPage with customTitleRow">
        <FormMainPageSpec customTitleRow={<h2>{'John Doe'}</h2>} />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormMainPage with Custom Views selector">
        <FormMainPageSpec
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormMainPage with Custom Views selector and no controls">
        <FormMainPageSpec
          hideControls
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
    </>
  ),
};
