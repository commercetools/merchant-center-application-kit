import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AngleLeftIcon, FlatButton } from '@commercetools-frontend/ui-kit';
import messages from './messages';

/**
 * Note:
 *   A full page reload is needed as the user's project may have changed (deletions and/or additions).
 *   As a result the project and user queries need refetching.
 */
const redirectToProject = key => window.location.replace(`/${key}`);

export const BackToProject = props => (
  <FormattedMessage {...messages.backToProjectLink}>
    {backToProjectMessage => (
      <FlatButton
        onClick={() => redirectToProject(props.projectKey || '')}
        iconLeft={<AngleLeftIcon />}
        label={backToProjectMessage}
      />
    )}
  </FormattedMessage>
);
BackToProject.displayName = 'BackToProject';
BackToProject.propTypes = {
  projectKey: PropTypes.string,
};

export default BackToProject;
