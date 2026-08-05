import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS, VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RevertIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import CustomFormMainPage from './custom-form-main-page';

// `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor. Measured
// per state so none of them scroll.
const specHeight = '520px';

const CustomFormMainPageSpec = ({
  height = specHeight,
  ...props
}: { height?: string } & Partial<
  ComponentProps<typeof CustomFormMainPage>
>) => (
  <div style={{ height }}>
    <CustomFormMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      formControls={
        <>
          <CustomFormMainPage.FormSecondaryButton
            label="Revert changes"
            iconLeft={<RevertIcon />}
            onClick={() => undefined}
          />
          <CustomFormMainPage.FormPrimaryButton
            label="Save"
            onClick={() => undefined}
          />
        </>
      }
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
    </CustomFormMainPage>
  </div>
);

const meta: Meta<typeof CustomFormMainPage> = {
  title: 'Application Components/CustomFormMainPage',
  component: CustomFormMainPage,
};

export default meta;

type Story = StoryObj<typeof CustomFormMainPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="CustomFormMainPage">
        <CustomFormMainPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormMainPage with no controls">
        <CustomFormMainPageSpec height="440px" hideControls />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormMainPage with customTitleRow">
        <CustomFormMainPageSpec
          height="480px"
          customTitleRow={<h2>{'John Doe'}</h2>}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormMainPage with Custom Views selector">
        <CustomFormMainPageSpec
          height="580px"
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormMainPage with Custom Views selector and no controls">
        <CustomFormMainPageSpec
          hideControls
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
    </>
  ),
};
