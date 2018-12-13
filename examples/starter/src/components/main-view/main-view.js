import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link, Route, Switch } from 'react-router-dom';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import ViewOne from '../view-one';
import ViewTwo from '../view-two';
import messages from './messages';

const MainView = props => (
  <Spacings.Stack scale="m">
    <Text.Headline elementType="h1">
      <FormattedMessage {...messages.title} />
    </Text.Headline>
    <Spacings.Stack scale="s">
      <Link to={`${props.match.url}/one`}>{'one'}</Link>
      <Link to={`${props.match.url}/two`}>{'two'}</Link>
    </Spacings.Stack>
    <Switch>
      <Route path={`${props.match.path}/one`} component={ViewOne} />
      <Route path={`${props.match.path}/two`} component={ViewTwo} />
    </Switch>
  </Spacings.Stack>
);
MainView.displayName = 'MainView';
MainView.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MainView;
