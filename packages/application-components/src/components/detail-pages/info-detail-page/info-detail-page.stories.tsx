import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS, VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  InfoPageBody,
  longSubtitle,
  longTitle,
} from '../../info-page-fixtures';
import InfoDetailPage from './info-detail-page';

// `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor. Measured
// per state so none of them scroll.
const specHeight = '440px';

const InfoDetailPageSpec = ({
  height = specHeight,
  ...props
}: { height?: string } & Partial<ComponentProps<typeof InfoDetailPage>>) => (
  <div style={{ position: 'relative', height }}>
    <InfoDetailPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      onPreviousPathClick={() => undefined}
      {...props}
    >
      <InfoPageBody />
    </InfoDetailPage>
  </div>
);

const meta: Meta<typeof InfoDetailPage> = {
  title: 'Application Components/InfoDetailPage',
  component: InfoDetailPage,
};

export default meta;

type Story = StoryObj<typeof InfoDetailPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="InfoDetailPage">
        <InfoDetailPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDetailPage - Long title and subtitle">
        <InfoDetailPageSpec
          height="560px"
          title={longTitle}
          subtitle={longSubtitle}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDetailPage - Without the top bar">
        <InfoDetailPageSpec title="" subtitle="" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDetailPage - With Custom Views selector">
        <InfoDetailPageSpec
          height="520px"
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
    </>
  ),
};
