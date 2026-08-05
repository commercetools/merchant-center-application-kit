import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PageContentNarrow,
  PageContentWide,
  PageContentFull,
} from '@commercetools-frontend/application-components';
import { VisualSpecGroup } from '../helpers';

// Not colocated: this exercises three containers together, so it belongs to no one component.

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

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
    <VisualSpecGroup label="PageContentContainerCombination_combinationA">
      <TestWrapper>
        <PageContentNarrow>
          <Box />
        </PageContentNarrow>
        <PageContentFull>
          <Box />
        </PageContentFull>
      </TestWrapper>
    </VisualSpecGroup>
  ),
};

export const CombinationB: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerCombination_combinationB">
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
    </VisualSpecGroup>
  ),
};

export const CombinationC: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerCombination_combinationC">
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
    </VisualSpecGroup>
  ),
};

export const CombinationD: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerCombination_combinationD">
      <TestWrapper>
        <PageContentNarrow>
          <Box />
        </PageContentNarrow>
        <PageContentWide>
          <Box />
        </PageContentWide>
      </TestWrapper>
    </VisualSpecGroup>
  ),
};

export const CombinationE: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerCombination_combinationE">
      <TestWrapper>
        <PageContentWide columns="1/1">
          <Box />
          <Box />
        </PageContentWide>
        <PageContentWide>
          <Box />
        </PageContentWide>
      </TestWrapper>
    </VisualSpecGroup>
  ),
};

export const CombinationF: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerCombination_combinationF">
      <TestWrapper>
        <PageContentWide columns="2/1">
          <Box />
          <Box />
        </PageContentWide>
        <PageContentWide>
          <Box />
        </PageContentWide>
      </TestWrapper>
    </VisualSpecGroup>
  ),
};
