import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

const meta: Meta<typeof PageUnauthorized> = {
  title: 'Application Components/PageUnauthorized',
  component: PageUnauthorized,
};

export default meta;

type Story = StoryObj<typeof PageUnauthorized>;

export const Default: Story = {
  render: () => <PageUnauthorized />,
};
