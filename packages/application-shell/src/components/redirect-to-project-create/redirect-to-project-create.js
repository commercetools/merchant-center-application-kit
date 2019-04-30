import React from 'react';
import PropTypes from 'prop-types';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { Spacings, Text, LinkButton } from '@commercetools-frontend/ui-kit';

export class RedirectToProjectCreate extends React.Component {
  static displayName = 'RedirectToProjectCreate';
  static propTypes = {
    servedByProxy: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);

    if (this.props.servedByProxy === true)
      window.location.replace('/account/projects/new');
  }
  render() {
    // NOTE: The redirect occurs in the contructor while if not a "development"
    // message will be shown as the application does not run behind
    // our proxy.
    return (
      <Spacings.Stack>
        <Text.Headline elementType="h3">Please create a project!</Text.Headline>
        <Text.Body>
          You are using the Merchant Center in development mode - it is not
          served by a proxy (`env.json`). Moreover, you do not have any projects
          yet. As a result we did not redirect you anywhere (e.g. another
          application).
        </Text.Body>
        <Text.Body>
          Please go to the `application-accounts` while having it runnign to
          create a project first.
        </Text.Body>
        <LinkButton to={`account/projects/new`} label="Create project" />
      </Spacings.Stack>
    );
  }
}

export default withApplicationContext(applicationContext => ({
  servedByProxy: applicationContext.environment.servedByProxy,
}))(RedirectToProjectCreate);
