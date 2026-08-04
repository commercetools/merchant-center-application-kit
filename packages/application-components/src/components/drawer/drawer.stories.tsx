import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useHistory } from 'react-router-dom';
import useModalState from '../../hooks/use-modal-state';
import InfoDialog from '../dialogs/info-dialog';
import Drawer from './drawer';

const routePath = '/drawer';

const DrawerSpec = ({
  children = <p>{'This is the drawer content'}</p>,
  ...props
}: Partial<ComponentProps<typeof Drawer>>) => {
  const history = useHistory();
  return (
    <Drawer
      isOpen
      onClose={() => history.push(routePath)}
      title="Drawer title"
      subtitle="Drawer subtitle"
      {...props}
    >
      {children}
    </Drawer>
  );
};

const meta: Meta<typeof Drawer> = {
  title: 'Application Components/Drawer',
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

// Order and names follow the six `pages` entries in `drawer.visualroute.tsx`.

export const SmallWithoutControls: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <DrawerSpec hideControls />,
};

export const SmallWithLongTitle: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <DrawerSpec
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    />
  ),
};

export const Small: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <DrawerSpec />,
};

export const Large: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <DrawerSpec size={20} />,
};

const DrawerWithInfoDialog = () => {
  const dialogState = useModalState(true);
  return (
    <DrawerSpec size={30}>
      <p>{'This is the drawer content'}</p>
      <InfoDialog
        isOpen={dialogState.isModalOpen}
        onClose={dialogState.closeModal}
        title="Info dialog title from within a drawer"
      >
        {'This is the content from inside the info dialog'}
      </InfoDialog>
    </DrawerSpec>
  );
};

// Percy's name says large but `size` is 30; kept literal for the parity mapping.
export const LargeWithInfoDialog: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <DrawerWithInfoDialog />,
};

export const XLarge: Story = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <DrawerSpec size={30} />,
};
