import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Drawer,
  InfoDialog,
  useModalState,
} from '@commercetools-frontend/application-components';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/drawer';

type ContainerProps = Partial<Parameters<typeof Drawer>[0]>;

function TestComponent(props: ContainerProps) {
  const navigate = useNavigate();
  return (
    <Drawer
      isOpen
      onClose={() => navigate(routePath)}
      title="Drawer title"
      subtitle="Drawer subtitle"
      {...props}
    >
      {props.children}
    </Drawer>
  );
}

const Content = () => {
  const dialogState = useModalState(true);
  return (
    <Routes>
      <Route
        path={`${routePath}/drawer-small-without-controls`}
        element={
          <TestComponent hideControls>
            <p>This is the drawer content</p>
          </TestComponent>
        }
      />
      <Route
        path={`${routePath}/drawer-small-with-long-title`}
        element={
          <TestComponent
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          >
            <p>This is the drawer content</p>
          </TestComponent>
        }
      />
      <Route
        path={`${routePath}/drawer-small`}
        element={
          <TestComponent>
            <p>This is the drawer content</p>
          </TestComponent>
        }
      />
      <Route
        path={`${routePath}/drawer-large`}
        element={
          <TestComponent size={20}>
            <p>This is the drawer content</p>
          </TestComponent>
        }
      />
      <Route
        path={`${routePath}/drawer-xlarge`}
        element={
          <TestComponent size={30}>
            <p>This is the drawer content</p>
          </TestComponent>
        }
      />
      <Route
        path={`${routePath}/drawer-large-with-info-dialog`}
        element={
          <TestComponent size={30}>
            <p>This is the drawer content</p>
            <InfoDialog
              isOpen={dialogState.isModalOpen}
              onClose={dialogState.closeModal}
              title="Info dialog title from within a drawer"
            >
              This is the content from inside the info dialog
            </InfoDialog>
          </TestComponent>
        }
      />
    </Routes>
  );
};

export const Component = () => (
  <Suite>
    <NestedPages
      title="Drawer"
      basePath={routePath}
      pages={[
        {
          path: 'drawer-small-without-controls',
          spec: <Content />,
        },
        {
          path: 'drawer-small-with-long-title',
          spec: <Content />,
        },
        {
          path: 'drawer-small',
          spec: <Content />,
        },
        {
          path: 'drawer-large',
          spec: <Content />,
        },
        {
          path: 'drawer-large-with-info-dialog',
          spec: <Content />,
        },
        {
          path: 'drawer-xlarge',
          spec: <Content />,
        },
      ]}
    />
  </Suite>
);
