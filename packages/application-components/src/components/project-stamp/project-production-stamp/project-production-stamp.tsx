import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { DotIcon } from '@commercetools-uikit/icons';
import Stamp from '@commercetools-uikit/stamp';
import messages from '../messages';

const ProjectProductionStamp = () => {
  const intl = useIntl();

  return (
    <Stamp
      tone="positive"
      isCondensed={true}
      label={intl.formatMessage(messages.ProjectProduction)}
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
          <DotIcon color="primary" />
        </div>
      }
    />
  );
};

export default ProjectProductionStamp;
