import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageContentWide from './page-content-wide';

const Box = ({ size = 'm' }: { size?: 's' | 'm' | 'l' }) => (
  <div
    style={{
      width: '100%',
      height: size === 's' ? '200px' : size === 'm' ? '60vh' : '2000px',
      backgroundColor: 'coral',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h2>{'Page content container wide'}</h2>
  </div>
);

const meta: Meta<typeof PageContentWide> = {
  title: 'Application Components/PageContentContainerWide',
  component: PageContentWide,
};

export default meta;

type Story = StoryObj<typeof PageContentWide>;

// Full-viewport layouts can't share a frame, so one export per state.

export const SingleColumn: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_singleColumn">
      <PageContentWide>
        <Box />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsHalfBigGap: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsHalfBigGap">
      <PageContentWide columns="1/1">
        <Box size="l" />
        <Box size="l" />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsHalfSmallGap: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsHalfSmallGap">
      <PageContentWide columns="1/1" gapSize="10">
        <Box size="s" />
        <Box />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsTwoThirdsBigGap: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsTwoThirdsBigGap">
      <PageContentWide columns="2/1">
        <Box size="l" />
        <Box size="s" />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsTwoThirdsSmallGap: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsTwoThirdsSmallGap">
      <PageContentWide columns="2/1" gapSize="10">
        <Box size="l" />
        <Box size="s" />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const SingleColumnSeveralChildren: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_singleColumnSeveralChildren">
      <PageContentWide>
        <Box />
        <Box />
        <Box />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsWithOneChild: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsWithOneChild">
      <PageContentWide columns="1/1">
        <Box />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};

export const TwoColumnsWithSeveralChildren: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerWide_twoColumnsWithSeveralChildren">
      <PageContentWide columns="2/1">
        <Box />
        <Box />
        <Box />
        <Box />
      </PageContentWide>
    </VisualSpecGroup>
  ),
};
