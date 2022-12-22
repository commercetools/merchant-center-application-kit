import { PageContentWide } from '@commercetools-frontend/application-components';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/page-content-container-wide';

const Box = ({ size = 'm' }: { size?: 's' | 'm' | 'l' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: size === 's' ? '200px' : size === 'm' ? '60vh' : '2000px',
        backgroundColor: 'coral',
      }}
    />
  );
};

export const Component = () => (
  <Suite>
    <NestedPages
      title="Page content container wide"
      basePath={routePath}
      pages={[
        {
          path: 'single column',
          spec: (
            <PageContentWide columns="1">
              <Box />
            </PageContentWide>
          ),
        },

        {
          path: 'two columns 1/1',
          spec: (
            <PageContentWide columns="1/1">
              <Box />
              <Box />
            </PageContentWide>
          ),
        },
        {
          path: 'two columns 1/1 with big gap',
          spec: (
            <PageContentWide columns="1/1" gapSize="20">
              <Box />
              <Box />
            </PageContentWide>
          ),
        },
        {
          path: 'two columns 2/1',
          spec: (
            <PageContentWide columns="2/1">
              <Box size="l" />
              <Box size="s" />
            </PageContentWide>
          ),
        },
        {
          path: 'two columns 2/1 with big gap',
          spec: (
            <PageContentWide columns="2/1" gapSize="20">
              <Box size="l" />
              <Box size="s" />
            </PageContentWide>
          ),
        },
      ]}
    />
  </Suite>
);
