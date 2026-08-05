import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageUnauthorized from './page-unauthorized';

const meta: Meta<typeof PageUnauthorized> = {
  title: 'Application Components/PageUnauthorized',
  component: PageUnauthorized,
};

export default meta;

type Story = StoryObj<typeof PageUnauthorized>;

export const AllVariants: Story = {
  render: () => (
    <VisualSpecGroup label="PageUnauthorized">
      <PageUnauthorized />
    </VisualSpecGroup>
  ),
};
