import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageContentFull from './page-content-full';

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
    <h3>{'Page content container full width'}</h3>
  </div>
);

const meta: Meta<typeof PageContentFull> = {
  title: 'Application Components/PageContentContainerFull',
  component: PageContentFull,
};

export default meta;

type Story = StoryObj<typeof PageContentFull>;

export const AllVariants: Story = {
  render: () => (
    <VisualSpecGroup label="PageContentContainerFull">
      <PageContentFull>
        <Box />
      </PageContentFull>
    </VisualSpecGroup>
  ),
};
