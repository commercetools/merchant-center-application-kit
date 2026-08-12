import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PageContentNarrow,
  PageContentWide,
  PageContentFull,
} from '@commercetools-frontend/application-components';

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
    <h2>{'Combination content'}</h2>
  </div>
);

// `overflow` makes this a scroll container for the sticky `2/1` column, so it
// doesn't chase the scroll.
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const meta: Meta = {
  title: 'Application Components/PageContentContainerCombinations',
};

export default meta;

type Story = StoryObj;

// Full-viewport layouts can't share a frame, so one export per state.

export const CombinationA: Story = {
  render: () => (
    <TestWrapper>
      <PageContentNarrow>
        <Box />
      </PageContentNarrow>
      <PageContentFull>
        <Box />
      </PageContentFull>
    </TestWrapper>
  ),
};

export const CombinationB: Story = {
  render: () => (
    <TestWrapper>
      <PageContentWide>
        <Box />
      </PageContentWide>
      <PageContentFull>
        <Box />
      </PageContentFull>
      <PageContentWide columns="1/1">
        <Box />
        <Box />
      </PageContentWide>
    </TestWrapper>
  ),
};

export const CombinationC: Story = {
  render: () => (
    <TestWrapper>
      <PageContentWide columns="2/1">
        <Box size="l" />
        <Box />
      </PageContentWide>
      <PageContentWide columns="1/1">
        <Box />
        <Box />
      </PageContentWide>
      <PageContentFull>
        <Box />
      </PageContentFull>
    </TestWrapper>
  ),
};

export const CombinationD: Story = {
  render: () => (
    <TestWrapper>
      <PageContentNarrow>
        <Box />
      </PageContentNarrow>
      <PageContentWide>
        <Box />
      </PageContentWide>
    </TestWrapper>
  ),
};

export const CombinationE: Story = {
  render: () => (
    <TestWrapper>
      <PageContentWide columns="1/1">
        <Box />
        <Box />
      </PageContentWide>
      <PageContentWide>
        <Box />
      </PageContentWide>
    </TestWrapper>
  ),
};

export const CombinationF: Story = {
  render: () => (
    <TestWrapper>
      <PageContentWide columns="2/1">
        <Box />
        <Box />
      </PageContentWide>
      <PageContentWide>
        <Box />
      </PageContentWide>
    </TestWrapper>
  ),
};
