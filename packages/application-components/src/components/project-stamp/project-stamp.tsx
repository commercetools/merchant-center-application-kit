import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { DotIcon } from '@commercetools-uikit/icons';
import Stamp, { TTone } from '@commercetools-uikit/stamp';
import messages from './messages';

type TProjectStampProps = {
  isProductionProject?: boolean | undefined;
  isSuspended?: boolean | undefined;
  isExpired?: boolean | undefined;
  willExpire?: boolean | undefined;
  daysLeft?: number | undefined;
};

function ProjectStamp(props: TProjectStampProps) {
  const intl = useIntl();

  const renderStamp = (tone: TTone, label: string, icon?: JSX.Element) => (
    <Stamp tone={tone} isCondensed={true} label={label} icon={icon} />
  );

  return (
    <div
      css={css`
        > * {
          width: max-content;
        }
      `}
    >
      {props.isProductionProject &&
        renderStamp(
          'positive',
          intl.formatMessage(messages.ProjectProduction),
          <div
            css={css`
              height: 18px;
              svg {
                height: 19px;
                width: 12px;
              }
            `}
          >
            <DotIcon color="primary" />
          </div>
        )}
      {props.isSuspended &&
        renderStamp('critical', intl.formatMessage(messages.ProjectSuspended))}
      {props.isExpired &&
        renderStamp('critical', intl.formatMessage(messages.ProjectExpired))}
      {props.willExpire &&
        renderStamp(
          'information',
          intl.formatMessage(messages.ProjectSuspended, {
            daysLeft: props.daysLeft || 0,
          })
        )}
    </div>
  );
}

ProjectStamp.displayName = 'ProjectStamp';

export default ProjectStamp;
