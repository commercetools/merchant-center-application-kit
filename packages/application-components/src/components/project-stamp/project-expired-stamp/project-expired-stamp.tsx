import { useIntl } from 'react-intl';
import Stamp from '@commercetools-uikit/stamp';
import messages from '../messages';

interface ProjectWillExpireStampProps {
  daysLeft?: number;
}

const ProjectExpiredStamp = ({ daysLeft }: ProjectWillExpireStampProps) => {
  const intl = useIntl();

  return (
    <Stamp
      tone={daysLeft ? 'information' : 'critical'}
      isCondensed={true}
      label={
        daysLeft
          ? intl.formatMessage(messages.ProjectWillExpire, {
              daysLeft: daysLeft || 0,
            })
          : intl.formatMessage(messages.ProjectExpired)
      }
    />
  );
};

export default ProjectExpiredStamp;
