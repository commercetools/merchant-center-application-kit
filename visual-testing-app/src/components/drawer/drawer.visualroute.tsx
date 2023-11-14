import { Route, Switch, useHistory } from 'react-router-dom';
import { Drawer } from '@commercetools-frontend/application-components';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/drawer';

type ContainerProps = Partial<Parameters<typeof Drawer>[0]>;

function TestComponent(props: ContainerProps) {
  const history = useHistory();
  return (
    <Drawer
      isOpen
      onClose={() => history.push(routePath)}
      title="Drawer title"
      subtitle="Drawer subtitle"
      {...props}
    >
      <p>This is the drawer content ({props.size || 10})</p>
    </Drawer>
  );
}

const Content = () => (
  <Switch>
    <Route path={`${routePath}/drawer-small-without-controls`}>
      <TestComponent hideControls />
    </Route>
    <Route path={`${routePath}/drawer-small-with-long-title`}>
      <TestComponent
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
        subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      />
    </Route>
    <Route path={`${routePath}/drawer-small`}>
      <TestComponent />
    </Route>
    <Route path={`${routePath}/drawer-large`}>
      <TestComponent size={20} />
    </Route>
    <Route path={`${routePath}/drawer-xlarge`}>
      <TestComponent size={30} />
    </Route>
    <Route path={`${routePath}/drawer-scale`}>
      <TestComponent size="scale" />
    </Route>
  </Switch>
);

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
          path: 'drawer-xlarge',
          spec: <Content />,
        },
        {
          path: 'drawer-scale',
          spec: <Content />,
        },
      ]}
    />
  </Suite>
);
