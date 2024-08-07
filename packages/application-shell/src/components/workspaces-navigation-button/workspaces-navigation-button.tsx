import { ReactElement } from 'react';
import { css } from '@emotion/react';
import { useFlagVariation } from '@flopflip/react-broadcast';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { featureFlags } from '@commercetools-frontend/constants/src';
import { designTokens } from '@commercetools-uikit/design-system';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Tooltip from '@commercetools-uikit/tooltip';
import messages from './messages';

type WorkspacesNavigationButtonProps = {
  projectKey: string | undefined;
};

export const FEATURE_NAME = 'Workspaces';

// TODO: This logo still TBD, placeholder for now
const WorkspacesLogo = () => {
  return (
    <div
      css={css`
        height: 22px;
        width: 22px;
        background-color: lightgray;
        border-radius: 4px;
      `}
    />
  );
};

const WorkspacesNavigationButton = ({
  projectKey,
}: WorkspacesNavigationButtonProps) => {
  const { formatMessage } = useIntl();
  const workspacesAppBarButtonEnabled = useFlagVariation(
    featureFlags.ENABLE_WORKSPACES_UI
  );

  // @ts-ignore It's coming from the MC API, it's an object { value: boolean }.
  const isWorkspacesButtonEnabled = workspacesAppBarButtonEnabled?.value;

  if (!isWorkspacesButtonEnabled) return null;

  /**
   * If we don't have a project key, there's no way to navigate to the workspaces page in the fallback application.
   * Once Workspaces lives in a centralized location, we can navigate to that specific URL.
   *
   * TODO: Reevaluate this after the iterative launcher / junior is released.
   */
  if (!projectKey) return null;

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
            iconLeft={(<WorkspacesLogo />) as ReactElement}
            as={Link}
            label={FEATURE_NAME}
            to={`/${projectKey}/workspaces`}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default WorkspacesNavigationButton;
