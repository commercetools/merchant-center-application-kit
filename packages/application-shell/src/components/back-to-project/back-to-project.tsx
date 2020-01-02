import React from 'react';
import { useIntl } from 'react-intl';
import FlatButton from '@commercetools-uikit/flat-button';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import messages from './messages';

type Props = {
  projectKey?: string;
};

/**
 * Note:
 *   A full page reload is needed as the user's project may have changed (deletions and/or additions).
 *   As a result the project and user queries need refetching.
 */
const redirectToProject = (key: string) => window.location.replace(`/${key}`);

export const BackToProject = (props: Props) => {
  const intl = useIntl();
  return (
    <FlatButton
      onClick={() => redirectToProject(props.projectKey || '')}
      icon={<AngleLeftIcon />}
      label={intl.formatMessage(messages.backToProjectLink)}
    />
  );
};
BackToProject.displayName = 'BackToProject';

export default BackToProject;
