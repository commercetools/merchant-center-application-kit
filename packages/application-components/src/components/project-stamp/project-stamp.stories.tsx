import { VisualSpec } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectStamp from './project-stamp';

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
