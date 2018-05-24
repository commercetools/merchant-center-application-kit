import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { graphql } from 'react-apollo';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import Text from '@commercetools-local/ui-kit/typography/text';
import { GRAPHQL_TARGETS, DOMAINS } from '@commercetools-local/constants';
import Avatar from '@commercetools-local/core/components/avatar';
import { injectConfiguration } from '@commercetools-local/application-shell-connectors';
import UserProfileForm from '../user-profile-form';
import UpdateUserProfile from './user-profile.graphql';
import styles from './user-profile.mod.css';
import messages from './messages';

// TODO: move it to uikit?
const Header = props => <div className={styles.header}>{props.children}</div>;
Header.displayName = 'Header';
Header.propTypes = { children: PropTypes.node.isRequired };

export class UserProfile extends React.Component {
  static displayName = 'UserProfile';

  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    projectsCount: PropTypes.number.isRequired,
    organizationsCount: PropTypes.number.isRequired,

    updateUserProfile: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    showApiErrorNotification: PropTypes.func.isRequired,

    intl: intlShape.isRequired,
  };

  static defaultProps = {
    projectsCount: 0,
    organizationsCount: 0,
  };

  handleSubmit = (values, formikBag) =>
    this.props
      .updateUserProfile({
        variables: {
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          version: values.version,
          user: {
            firstName: values.firstName,
            lastName: values.lastName,
            language: values.language,
            timeZone: values.timeZone,
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

        formikBag.setSubmitting(false);

        // We need to reset the form (for new version & data)
        formikBag.resetForm();
      })
      .catch(error => {
        formikBag.setSubmitting(false);
        this.props.showApiErrorNotification({ errors: [error] });
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
            onSubmit={this.handleSubmit}
            initialValues={this.props.user}
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
  graphql(UpdateUserProfile, { name: 'updateUserProfile' }),
  injectConfiguration(['env'], 'env')
)(UserProfile);
