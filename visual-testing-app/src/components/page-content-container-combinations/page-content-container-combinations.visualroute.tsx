import type { ReactNode } from 'react';
import {
  PageContentNarrow,
  PageContentWide,
  PageContentFull,
} from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/page-content-container-combinations';

const Box = ({ size = 'm' }: { size?: 's' | 'm' | 'l' }) => {
  return (
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
      <h2>Combination content</h2>
    </div>
  );
};

const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {children}
    </div>
  );
};

export const Component = () => (
  <Suite>
    <ThemeProvider />
    <NestedPages
      title="Page content container combinations"
      basePath={routePath}
      pages={[
        {
          name: 'Combination A',
          path: 'comb-a',
          spec: (
            <TestWrapper>
              <PageContentNarrow>
                <Box />
              </PageContentNarrow>
              <PageContentFull>
                <Box />
              </PageContentFull>
            </TestWrapper>
          ),
        },

        {
          name: 'Combination B',
          path: 'comb-b',
          spec: (
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
        },
        {
          name: 'Combination C',
          path: 'comb-c',
          spec: (
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
        },
        {
          name: 'Combination D',
          path: 'comb-d',
          spec: (
            <TestWrapper>
              <PageContentNarrow>
                <Box />
              </PageContentNarrow>
              <PageContentWide>
                <Box />
              </PageContentWide>
            </TestWrapper>
          ),
        },
        {
          name: 'Combination E',
          path: 'comb-e',
          spec: (
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
        },
        {
          name: 'Combination F',
          path: 'comb-f',
          spec: (
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
        },
      ]}
    />
  </Suite>
);
