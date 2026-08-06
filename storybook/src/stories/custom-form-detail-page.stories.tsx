import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomFormDetailPage } from '@commercetools-frontend/application-components';
import IconButton from '@commercetools-uikit/icon-button';
import {
  BinLinearIcon,
  FlameIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import { FormPageEmailField, FormPageValues } from '../fixtures/form-page';
import {
  CUSTOM_VIEW_LOCATORS,
  VisualSpecGroup,
  longSubtitle,
  longTitle,
} from '../helpers';

// `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor. Measured
// per state so none of them scroll.
const specHeight = '440px';

const CustomFormDetailPageSpec = ({
  height = specHeight,
  ...props
}: { height?: string } & Partial<
  ComponentProps<typeof CustomFormDetailPage>
>) => (
  <div style={{ position: 'relative', height }}>
    <FormPageValues>
      <CustomFormDetailPage
        title="Lorem ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        onPreviousPathClick={() => undefined}
        {...props}
      >
        <FormPageEmailField />
      </CustomFormDetailPage>
    </FormPageValues>
  </div>
);

const FormControls = () => (
  <>
    <CustomFormDetailPage.FormSecondaryButton onClick={() => undefined} />
    <CustomFormDetailPage.FormPrimaryButton onClick={() => undefined} />
    <CustomFormDetailPage.FormDeleteButton onClick={() => undefined} />
  </>
);

const meta: Meta<typeof CustomFormDetailPage> = {
  title: 'Application Components/CustomFormDetailPage',
  component: CustomFormDetailPage,
};

export default meta;

type Story = StoryObj<typeof CustomFormDetailPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="CustomFormDetailPage">
        <CustomFormDetailPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - with the static exposed form controls">
        <CustomFormDetailPageSpec formControls={<FormControls />} />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - with other custom controls">
        <CustomFormDetailPageSpec
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
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - with hidden controls">
        <CustomFormDetailPageSpec
          formControls={<FormControls />}
          hideControls
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - long title and subtitle">
        <CustomFormDetailPageSpec
          height="480px"
          title={longTitle}
          subtitle={longSubtitle}
          formControls={<FormControls />}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - Custom Views selector">
        <CustomFormDetailPageSpec
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
          formControls={<FormControls />}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="CustomFormDetailPage - Custom Views selector with no controls">
        <CustomFormDetailPageSpec
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
          hideControls
        />
      </VisualSpecGroup>
    </>
  ),
};
