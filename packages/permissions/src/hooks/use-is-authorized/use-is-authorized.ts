import { useEffect } from 'react';
import warning from 'tiny-warning';
import type {
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import {
  useApplicationContext,
  useCustomViewContext,
} from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  hasSomeDataFence,
  getImpliedPermissions,
} from '../../utils/has-permissions';

// Permissions
type TPermissionName = string;
// Action rights
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
// Data fences
type TDemandedDataFence = {
  group: string;
  name: string;
  type: string;
};
type TSelectDataFenceData = (
  demandedDataFenceWithActualValues: TDemandedDataFence & {
    actualDataFenceValues: string[];
  }
) => string[] | null;
type TProjectPermissions = {
  permissions: TNormalizedPermissions | null;
  actionRights: TNormalizedActionRights | null;
  dataFences: TNormalizedDataFences | null;
};

// Log a warning only once, and not on each render.
const useWarning = (condition: boolean, message: string) => {
  useEffect(() => {
    warning(condition, message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const useResolvePermissionsData = (
  projectPermissions?: TProjectPermissions
): {
  resolvedPermissions: TNormalizedPermissions;
  resolvedActionRights: TNormalizedActionRights;
  resolvedDataFences: TNormalizedDataFences;
} => {
  const customApplicationContext = useApplicationContext();
  const customViewContext = useCustomViewContext();

  return {
    resolvedPermissions:
      projectPermissions?.permissions ||
      customApplicationContext.permissions ||
      customViewContext.permissions,
    resolvedActionRights:
      projectPermissions?.actionRights ||
      customApplicationContext.actionRights ||
      customViewContext.actionRights,
    resolvedDataFences:
      projectPermissions?.dataFences ||
      customApplicationContext.dataFences ||
      customViewContext.dataFences,
  };
};

const useIsAuthorized = ({
  demandedPermissions,
  demandedActionRights,
  demandedDataFences,
  selectDataFenceData,
  shouldMatchSomePermissions = false,
  projectPermissions,
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceData?: TSelectDataFenceData;
  shouldMatchSomePermissions?: boolean;
  projectPermissions?: TProjectPermissions;
}): boolean => {
  const impliedPermissions = getImpliedPermissions(demandedPermissions);

  useWarning(
    !demandedActionRights || demandedActionRights.length === 1,
    `@commercetools-frontend/permissions: It is recommended to pass a single demanded action right while using the hook, HoC or component multiple times.`
  );
  useWarning(
    !demandedPermissions || demandedPermissions.length === 1,
    `@commercetools-frontend/permissions: It is recommended to pass a single demanded permission while using the hook, HoC or component multiple times.`
  );
  useWarning(
    shouldMatchSomePermissions === false,
    `@commercetools-frontend/permissions: It is recommended not to use 'shouldMatchSomePermissions' but instead use the hook, HoC or component multiple times.`
  );
  useWarning(
    !impliedPermissions || impliedPermissions.length === 0,
    `@commercetools-frontend/permissions: Demanded permissions contain implied permissions. These are implied: ${impliedPermissions.join(
      ', '
    )}.`
  );

  const { resolvedPermissions, resolvedActionRights, resolvedDataFences } =
    useResolvePermissionsData(projectPermissions);

  // if the user has no permissions and no dataFences assigned to them, they are not authorized
  if (!resolvedPermissions && !resolvedDataFences) return false;

  let hasDemandedDataFences = false;
  if (demandedDataFences && demandedDataFences.length > 0) {
    if (!selectDataFenceData) {
      reportErrorToSentry(
        new Error(
          `@commercetools-frontend/permissions/Authorized: Missing data fences selector "selectDataFenceData".`
        )
      );
    }
    hasDemandedDataFences = hasSomeDataFence({
      actualPermissions: resolvedPermissions,
      demandedDataFences,
      actualDataFences: resolvedDataFences,
      selectDataFenceData,
    });
  }

  const hasDemandedPermissions = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, resolvedPermissions)
    : hasEveryPermissions(demandedPermissions, resolvedPermissions);

  const hasDemandedActionRights = hasEveryActionRight(
    demandedActionRights || [],
    resolvedActionRights
  );

  return (
    hasDemandedDataFences || (hasDemandedPermissions && hasDemandedActionRights)
  );
};

export default useIsAuthorized;
