import { css } from '@emotion/react';
import { useFlagVariation } from '@flopflip/react-broadcast';
import { useIntl } from 'react-intl';
import WorkspacesIcon from '@commercetools-frontend/assets/images/workspaces-icon.svg';
import { featureFlags } from '@commercetools-frontend/constants';
import { designTokens } from '@commercetools-uikit/design-system';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Tooltip from '@commercetools-uikit/tooltip';
import location from '../../utils/location/location';
import messages from './messages';

export const FEATURE_NAME = 'Workspaces';

const WorkspacesIconComponent = () => {
  return <img alt="workspaces icon" src={WorkspacesIcon} />;
};

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
            iconLeft={<WorkspacesIconComponent />}
            label={FEATURE_NAME}
            onClick={() => {
              location.replace('/workspaces');
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default WorkspacesNavigationButton;
