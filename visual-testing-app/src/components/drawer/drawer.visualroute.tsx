import { Route, Switch, useHistory } from 'react-router-dom';
import { Drawer } from '@commercetools-frontend/application-components';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/drawer';

function TestComponent({
  size,
  hideControls,
}: {
  size: 10 | 20 | 30 | 'scale';
  hideControls: boolean;
}) {
  const history = useHistory();
  return (
    <Drawer
      isOpen
      onClose={() => history.push(routePath)}
      size={size}
      title="Drawer title"
      subtitle="Drawer subtitle"
      hideControls={hideControls}
    >
      <p>This is the drawer content ({size})</p>
    </Drawer>
  );
}

const Content = () => (
  <Switch>
    <Route path={`${routePath}/drawer-small-without-controls`}>
      <TestComponent size={10} hideControls />
    </Route>
    <Route path={`${routePath}/drawer-small`}>
      <TestComponent size={10} hideControls={false} />
    </Route>
    <Route path={`${routePath}/drawer-large`}>
      <TestComponent size={20} hideControls={false} />
    </Route>
    <Route path={`${routePath}/drawer-xlarge`}>
      <TestComponent size={30} hideControls={false} />
    </Route>
    <Route path={`${routePath}/drawer-scale`}>
      <TestComponent size="scale" hideControls={false} />
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
