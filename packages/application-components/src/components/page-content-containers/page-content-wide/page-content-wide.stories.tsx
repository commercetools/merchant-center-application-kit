import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageContentWide from './page-content-wide';

// Scroll container for the sticky `2/1` column, so it doesn't chase the scroll.
const Frame = ({ children }: { children: ReactNode }) => (
  <div style={{ overflow: 'hidden' }}>{children}</div>
);

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
    <Frame>
      <PageContentWide>
        <Box />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsHalfBigGap: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="1/1">
        <Box size="l" />
        <Box size="l" />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsHalfSmallGap: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="1/1" gapSize="10">
        <Box size="s" />
        <Box />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsTwoThirdsBigGap: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="2/1">
        <Box size="l" />
        <Box size="s" />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsTwoThirdsSmallGap: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="2/1" gapSize="10">
        <Box size="l" />
        <Box size="s" />
      </PageContentWide>
    </Frame>
  ),
};

export const SingleColumnSeveralChildren: Story = {
  render: () => (
    <Frame>
      <PageContentWide>
        <Box />
        <Box />
        <Box />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsWithOneChild: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="1/1">
        <Box />
      </PageContentWide>
    </Frame>
  ),
};

export const TwoColumnsWithSeveralChildren: Story = {
  render: () => (
    <Frame>
      <PageContentWide columns="2/1">
        <Box />
        <Box />
        <Box />
        <Box />
      </PageContentWide>
    </Frame>
  ),
};
