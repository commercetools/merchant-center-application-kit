import { useIntl, FormattedMessage } from 'react-intl';
import { DotIcon } from '@commercetools-uikit/icons';
import Stamp, { TTone } from '@commercetools-uikit/stamp';
import messages from './messages';

type TProjectStampProps = {
  isProductionProject?: boolean;
  isSuspended?: boolean;
  isExpired?: boolean;
  willExpire?: boolean | undefined;
  daysLeft?: number;
};

function ProjectStamp(props: TProjectStampProps) {
  const intl = useIntl();

  const renderStamp = (
    tone: TTone,
    message: React.ReactNode,
    icon?: JSX.Element
  ) => (
    <Stamp tone={tone} isCondensed={false} icon={icon}>
      {message}
    </Stamp>
  );

  return (
    <div>
      {props.isProductionProject &&
        renderStamp(
          'positive',
          <FormattedMessage {...messages.ProjectProduction} />,
          <DotIcon />
        )}
      {props.isSuspended &&
        renderStamp(
          'critical',
          <FormattedMessage {...messages.ProjectSuspended} />
        )}
      {props.isExpired &&
        renderStamp(
          'critical',
          <FormattedMessage {...messages.ProjectExpired} />
        )}
      {props.willExpire &&
        renderStamp(
          'information',
          intl.formatMessage(messages.ProjectWillExpire, {
            daysLeft: props.daysLeft || 0,
          })
        )}
    </div>
  );
}

ProjectStamp.displayName = 'ProjectStamp';

export default ProjectStamp;
