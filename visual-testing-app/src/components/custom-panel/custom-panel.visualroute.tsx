import { Route, Switch } from 'react-router-dom';
import { CustomPanelContainer } from '@commercetools-frontend/application-components';
import { Suite, NestedPages } from '../../test-utils';

export const routePath = '/custom-views/custom-panel';

function TestComponent({ size }: { size: 'small' | 'large' }) {
  return (
    <CustomPanelContainer onClose={() => {}} size={size} title="Custom Panel">
      <p>This is the panel content ({size})</p>
    </CustomPanelContainer>
  );
}

const Content = () => (
  <Switch>
    <Route path={`${routePath}/custom-panel-large`}>
      <TestComponent size="large" />
    </Route>
    <Route path={`${routePath}/custom-panel-small`}>
      <TestComponent size="small" />
    </Route>
  </Switch>
);

export const Component = () => (
  <Suite>
    <NestedPages
      title="Custom Views -> Custom Panel"
      basePath={routePath}
      pages={[
        {
          path: 'custom-panel-large',
          spec: <Content />,
        },
        {
          path: 'custom-panel-small',
          spec: <Content />,
        },
      ]}
    />
  </Suite>
);
