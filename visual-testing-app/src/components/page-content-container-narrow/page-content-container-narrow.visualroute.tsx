import { PageContentNarrow } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/page-content-container-narrow';

const Box = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '75vh',
        backgroundColor: 'coral',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>Page content container narrow</h2>
    </div>
  );
};

export const Component = () => (
  <Suite>
    <ThemeProvider theme="default" />
    <Spec label="PageContentContainerNarrow" size="xl">
      <PageContentNarrow>
        <Box />
      </PageContentNarrow>
    </Spec>
  </Suite>
);
