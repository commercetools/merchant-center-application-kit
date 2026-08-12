import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormDetailPage } from '@commercetools-frontend/application-components';
import { FormPageEmailField, FormPageValues } from '../fixtures/form-page';
import {
  CUSTOM_VIEW_LOCATORS,
  VisualSpecGroup,
  longSubtitle,
  longTitle,
} from '../helpers';

// `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor. Measured
// against the tallest content in each state so none of them scroll.
const specHeight = '440px';
const longTitleSpecHeight = '480px';

const FormDetailPageSpec = ({
  height = specHeight,
  ...props
}: { height?: string } & Partial<ComponentProps<typeof FormDetailPage>>) => (
  <div style={{ position: 'relative', height }}>
    <FormPageValues>
      <FormDetailPage
        title="Lorem ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        onSecondaryButtonClick={() => undefined}
        onPrimaryButtonClick={() => undefined}
        onPreviousPathClick={() => undefined}
        {...props}
      >
        <FormPageEmailField />
      </FormDetailPage>
    </FormPageValues>
  </div>
);

const meta: Meta<typeof FormDetailPage> = {
  title: 'Application Components/FormDetailPage',
  component: FormDetailPage,
};

export default meta;

type Story = StoryObj<typeof FormDetailPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="FormDetailPage">
        <FormDetailPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - Primary button disabled">
        <FormDetailPageSpec isPrimaryButtonDisabled />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - Secondary button disabled">
        <FormDetailPageSpec isSecondaryButtonDisabled />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - Long title and subtitle">
        <FormDetailPageSpec
          height={longTitleSpecHeight}
          title={longTitle}
          subtitle={longSubtitle}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - With hidden controls">
        <FormDetailPageSpec hideControls />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - With Custom Views selector">
        <FormDetailPageSpec
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDetailPage - With Custom Views selector and no controls">
        <FormDetailPageSpec
          hideControls
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
    </>
  ),
};
