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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>Page content container wide</h2>
    </div>
  );
};

export const Component = () => (
  <Suite>
    <NestedPages
      title="Page content container wide"
      basePath={routePath}
      pages={[
        {
          name: 'single column',
          path: 'single-column',
          spec: (
            <PageContentWide>
              <Box />
            </PageContentWide>
          ),
        },

        {
          name: 'two columns 1/1',
          path: 'two-columns-half',
          spec: (
            <PageContentWide columns="1/1">
              <Box />
              <Box />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns 1/1 with big gap',
          path: 'two-columns-half-big-gap',
          spec: (
            <PageContentWide columns="1/1" gapSize="20">
              <Box size="l" />
              <Box size="s" />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns 2/1',
          path: 'two-columns-two-thirds',
          spec: (
            <PageContentWide columns="2/1">
              <Box size="l" />
              <Box size="s" />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns 2/1 with big gap',
          path: 'two-columns-two-thirds-big-gap',
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
