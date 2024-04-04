import { PageContentWide } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
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
    <ThemeProvider theme="recolouring" />
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
              <Box size="l" />
              <Box size="l" />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns 1/1 with small gap',
          path: 'two-columns-half-small-gap',
          spec: (
            <PageContentWide columns="1/1" gapSize="10">
              <Box size="s" />
              <Box />
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
          name: 'two columns 2/1 with small gap',
          path: 'two-columns-two-thirds-small-gap',
          spec: (
            <PageContentWide columns="2/1" gapSize="10">
              <Box size="l" />
              <Box size="s" />
            </PageContentWide>
          ),
        },
        {
          name: 'single column with several children',
          path: 'single-column-with-several-children',
          spec: (
            <PageContentWide>
              <Box />
              <Box />
              <Box />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns with one child',
          path: 'two-columns-with-one-child',
          spec: (
            <PageContentWide columns="1/1">
              <Box />
            </PageContentWide>
          ),
        },
        {
          name: 'two columns with several children',
          path: 'two-column-with-several-children',
          spec: (
            <PageContentWide columns="2/1">
              <Box />
              <Box />
              <Box />
              <Box />
            </PageContentWide>
          ),
        },
      ]}
    />
  </Suite>
);
