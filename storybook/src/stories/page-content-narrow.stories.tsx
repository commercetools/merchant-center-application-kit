import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageContentNarrow } from '@commercetools-frontend/application-components';

const Box = () => (
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
    <h2>{'Page content container narrow'}</h2>
  </div>
);

const meta: Meta<typeof PageContentNarrow> = {
  title: 'Application Components/PageContentContainerNarrow',
  component: PageContentNarrow,
};

export default meta;

type Story = StoryObj<typeof PageContentNarrow>;

export const Default: Story = {
  render: () => (
    <PageContentNarrow>
      <Box />
    </PageContentNarrow>
  ),
};
