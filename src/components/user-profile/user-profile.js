import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import Text from '@commercetools-local/ui-kit/typography/text';
import { GRAPHQL_TARGETS, DOMAINS } from '@commercetools-local/constants';
import logger from '@commercetools-local/utils/logger';
import Avatar from '@commercetools-local/core/components/avatar';
import injectConfiguration from '@commercetools-local/core/components/configuration/inject-configuration';
import UserProfileForm from '../user-profile-form';
import styles from './user-profile.mod.css';
import messages from './messages';

// TODO: move it to uikit?
const Header = props => <div className={styles.header}>{props.children}</div>;
Header.displayName = 'Header';
Header.propTypes = { children: PropTypes.node.isRequired };

const UserProfileMutation = gql`
  mutation($version: Int!, $user: UserProfileInput!) {
    updateUserProfile(version: $version, user: $user) {
      id
      version
      email
      firstName
      lastName
      language
      timeZone
    }
  }
`;

export class UserProfile extends React.Component {
  static displayName = 'UserProfile';

  static propTypes = {
    route: PropTypes.object.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    projectsCount: PropTypes.number.isRequired,
    organizationsCount: PropTypes.number.isRequired,

    updateUserProfile: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    showUnexpectedErrorNotification: PropTypes.func.isRequired,

    env: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    projectsCount: 0,
    organizationsCount: 0,
  };

  handleSave = formData =>
    this.props
      .updateUserProfile({
        variables: {
          target: GRAPHQL_TARGETS.MerchantCenterBackend,
          version: formData.version,
          user: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            language: formData.language,
            timeZone: formData.timeZone,
          },
        },
      })
      .then(() => {
        // Dispatch a success notification
        this.props.showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: this.props.intl.formatMessage(messages.userUpdated),
        });
      })
      .catch(error => {
        // On production we send the errors to Sentry.
        if (this.props.env !== 'production') logger.error(error, error.stack);
        // Show an error message
        this.props.showUnexpectedErrorNotification({ error });
        // Notify redux-form that there was an error.
        throw new SubmissionError();
      });

  render() {
    if (!this.props.user) return null;
    return (
      <div
        /* TODO: build this into UIKit (e.g. <Page>) */
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Header>
          <Spacings.Inset>
            <Spacings.Inline scale="m" alignItems="center">
              <Avatar
                email={this.props.user.email}
                firstName={this.props.user.firstName}
                lastName={this.props.user.lastName}
                size="big"
              />
              <div>
                <Text.Headline elementType="h1">
                  {`${this.props.user.firstName} ${this.props.user.lastName}`}
                </Text.Headline>
                <Text.Body>
                  <FormattedMessage
                    {...messages.subtitle}
                    values={{
                      organizationsCount: this.props.organizationsCount,
                      projectsCount: this.props.projectsCount,
                    }}
                  />
                </Text.Body>
              </div>
            </Spacings.Inline>
          </Spacings.Inset>
        </Header>

        <div
          /* TODO: build this into UIKit (e.g. <Page.Content scrollable={true}>) */
          style={{ overflow: 'auto', flexGrow: 1 }}
        >
          <UserProfileForm
            // This is specific to redux-form
            initialValues={this.props.user}
            onSubmit={this.handleSave}
            route={this.props.route}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withProps(props => ({
    projectsCount: props.user ? props.user.availableProjects.length : 0,
    organizationsCount: props.user
      ? props.user.availableOrganizations.length
      : 0,
  })),
  graphql(UserProfileMutation, { name: 'updateUserProfile' }),
  injectConfiguration('env', 'env')
)(UserProfile);
