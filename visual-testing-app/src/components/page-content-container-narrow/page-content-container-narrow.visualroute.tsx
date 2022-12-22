import { PageContentNarrow } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/page-content-container-narrow';

const Box = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '75vh',
        backgroundColor: 'coral',
      }}
    />
  );
};

export const Component = () => (
  <Suite>
    <Spec label="PageContentContainerNarrow" size="xl">
      <PageContentNarrow>
        <Box />
      </PageContentNarrow>
    </Spec>
  </Suite>
);
