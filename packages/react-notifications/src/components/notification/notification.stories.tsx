import type { ReactNode } from 'react';
import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DOMAINS } from '@commercetools-frontend/constants';
import Notification from './notification';

// `SIDE` notifications `float: right`, which a flex parent ignores; `flow-root` restores
// the float and contains it, so the row keeps the card's height.
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flow-root' }}>{children}</div>
);

const meta: Meta<typeof Notification> = {
  title: 'React Notifications/Notification',
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="Notification - Side (success)">
        <Row>
          <Notification type="success" domain={DOMAINS.SIDE}>
            {'I am your father.'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Side (info)">
        <Row>
          <Notification type="info" domain={DOMAINS.SIDE}>
            {'Do or do not, there is no try.'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Side (warning)">
        <Row>
          <Notification type="warning" domain={DOMAINS.SIDE}>
            {'These are not the droids you are looking for!'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Side (error)">
        <Row>
          <Notification type="error" domain={DOMAINS.SIDE}>
            {`It's a trap!`}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Page (success)">
        <Row>
          <Notification type="success" domain={DOMAINS.PAGE}>
            {'I am your father.'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Page (info)">
        <Row>
          <Notification type="info" domain={DOMAINS.PAGE}>
            {'Do or do not, there is no try.'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Page (warning)">
        <Row>
          <Notification type="warning" domain={DOMAINS.PAGE}>
            {'These are not the droids you are looking for!'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Page (error)">
        <Row>
          <Notification type="error" domain={DOMAINS.PAGE}>
            {`It's a trap!`}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Global (info)">
        <Row>
          <Notification type="info" domain={DOMAINS.GLOBAL}>
            {'Do or do not, there is no try.'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Global (warning)">
        <Row>
          <Notification type="warning" domain={DOMAINS.GLOBAL}>
            {'These are not the droids you are looking for!'}
          </Notification>
        </Row>
      </VisualSpecGroup>
      <VisualSpecGroup label="Notification - Global (error)">
        <Row>
          <Notification type="error" domain={DOMAINS.GLOBAL}>
            {`It's a trap!`}
          </Notification>
        </Row>
      </VisualSpecGroup>
    </>
  ),
};
