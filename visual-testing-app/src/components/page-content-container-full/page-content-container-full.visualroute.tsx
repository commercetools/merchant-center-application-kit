import { PageContentFull } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/page-content-container-full';

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
    <Spec label="PageContentContainerFull" size="xl">
      <PageContentFull>
        <Box />
      </PageContentFull>
    </Spec>
  </Suite>
);
