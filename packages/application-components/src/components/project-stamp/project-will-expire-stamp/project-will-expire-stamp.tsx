import { useIntl } from 'react-intl';
import Stamp from '@commercetools-uikit/stamp';
import messages from '../messages';

interface ProjectWillExpireStampProps {
  daysLeft?: number;
}

const ProjectWillExpireStamp = ({ daysLeft }: ProjectWillExpireStampProps) => {
  const intl = useIntl();

  return (
    <Stamp
      tone="information"
      isCondensed={true}
      label={intl.formatMessage(messages.ProjectSuspended, {
        daysLeft: daysLeft || 0,
      })}
    />
  );
};

export default ProjectWillExpireStamp;
