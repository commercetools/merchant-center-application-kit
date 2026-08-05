import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageNotFound from './page-not-found';

const meta: Meta<typeof PageNotFound> = {
  title: 'Application Components/PageNotFound',
  component: PageNotFound,
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const AllVariants: Story = {
  render: () => (
    <VisualSpecGroup label="PageNotFound">
      <PageNotFound />
    </VisualSpecGroup>
  ),
};
