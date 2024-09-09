import { css } from '@emotion/react';
import { useFlagVariation } from '@flopflip/react-broadcast';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import WorkspacesIcon from '@commercetools-frontend/assets/images/workspaces-icon.svg';
import { featureFlags } from '@commercetools-frontend/constants';
import { designTokens } from '@commercetools-uikit/design-system';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Tooltip from '@commercetools-uikit/tooltip';
import messages from './messages';

export const FEATURE_NAME = 'Workspaces';

const WorkspacesNavigationButton = () => {
  const { formatMessage } = useIntl();
  const workspacesAppBarButtonEnabled = useFlagVariation(
    featureFlags.ENABLE_WORKSPACES_UI
  );

  // @ts-ignore It's coming from the MC API, it's an object { value: boolean }.
  const isWorkspacesButtonEnabled = workspacesAppBarButtonEnabled?.value;

  if (!isWorkspacesButtonEnabled) return null;

  return (
    <div
      css={css`
        margin-right: ${designTokens.spacing60};
      `}
    >
      <div
        css={css`
          a {
            border-radius: ${designTokens.borderRadius20};
          }
        `}
      >
        <Tooltip placement="bottom" title={formatMessage(messages.tooltip)}>
          <SecondaryButton
            iconLeft={<WorkspacesIcon />}
            as={Link}
            label={FEATURE_NAME}
            to={'/workspaces'}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default WorkspacesNavigationButton;
