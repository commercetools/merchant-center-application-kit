import { useIntl } from 'react-intl';
import Stamp from '@commercetools-uikit/stamp';
import messages from '../messages';

const ProjectExpiredStamp = () => {
  const intl = useIntl();

  return (
    <Stamp
      tone="critical"
      isCondensed={true}
      label={intl.formatMessage(messages.ProjectExpired)}
    />
  );
};

export default ProjectExpiredStamp;
