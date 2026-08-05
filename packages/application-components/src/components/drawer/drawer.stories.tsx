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

// Full-viewport overlays can't share a frame, so one export per state.

export const SmallWithoutControls: Story = {
  render: () => <DrawerSpec hideControls />,
};

export const SmallWithLongTitle: Story = {
  render: () => (
    <DrawerSpec
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    />
  ),
};

export const Small: Story = {
  render: () => <DrawerSpec />,
};

export const Large: Story = {
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

export const XLargeWithInfoDialog: Story = {
  render: () => <DrawerWithInfoDialog />,
};

export const XLarge: Story = {
  render: () => <DrawerSpec size={30} />,
};
