import { ReactElement } from 'react';
import { css } from '@emotion/react';
import { MessageDescriptor, useIntl } from 'react-intl';
import { DotIcon } from '@commercetools-uikit/icons';
import Stamp, { TTone } from '@commercetools-uikit/stamp';
import messages from './messages';

type TCustomStampProps = {
  tone: TTone;
  label: MessageDescriptor & { values?: Record<string, string | number> };
  icon?: ReactElement;
};
function CustomStamp(props: TCustomStampProps) {
  const intl = useIntl();

  const { values, ...message } = props.label;
  return (
    <Stamp
      tone={props.tone}
      isCondensed={true}
      label={intl.formatMessage(message, values || {})}
      icon={props.icon}
    />
  );
}

const IsProduction = () => {
  return (
    <CustomStamp
      tone="positive"
      label={messages.ProjectProduction}
      icon={
        <div
          css={css`
            height: 18px;
            svg {
              height: 18px;
              width: 12px;
            }
          `}
        >
          <DotIcon color="success" />
        </div>
      }
    />
  );
};

const IsSuspended = () => (
  <CustomStamp tone="critical" label={messages.ProjectSuspended} />
);

const IsExpired = () => (
  <CustomStamp tone="critical" label={messages.ProjectExpired} />
);

const WillExpire = (props: { daysLeft: number }) => (
  <CustomStamp
    tone="information"
    label={{
      ...messages.ProjectWillExpire,
      values: { daysLeft: props.daysLeft },
    }}
  />
);

const ProjectStamp = {
  IsProduction,
  IsSuspended,
  IsExpired,
  WillExpire,
};

export default ProjectStamp;
