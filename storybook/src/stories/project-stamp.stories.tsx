import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectStamp } from '@commercetools-frontend/application-components';
import { VisualSpec } from '../helpers';

const meta: Meta = {
  title: 'Application Components/ProjectStamp',
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpec label="Production project stamp">
        <ProjectStamp.IsProduction />
      </VisualSpec>
      <VisualSpec label="Suspended project stamp">
        <ProjectStamp.IsSuspended />
      </VisualSpec>
      <VisualSpec label="Expired project stamp">
        <ProjectStamp.IsExpired />
      </VisualSpec>
      <VisualSpec label="Will expire project stamp">
        <ProjectStamp.WillExpire daysLeft={3} />
      </VisualSpec>
    </>
  ),
};
