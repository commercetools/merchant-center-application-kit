import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  hasAppliedDataFence,
} from '../../utils/has-permissions';

// Permissions
type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};
// Action rights
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
// Data fences
type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission | null;
};
type TDataFenceType = 'store';
type TDataFences = {
  // E.g. { store: {...} }
  [key in TDataFenceType]: TDataFenceGroupedByResourceType;
};
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};
type TSelectDataFenceDataByType = (dataFenceWithType: {
  type: TDataFenceType;
}) => string[] | null;

// Forward-compatibility with React Hooks 🎉
const useIsAuthorized = ({
  demandedPermissions,
  demandedActionRights,
  demandedDataFences,
  selectDataFenceDataByType,
  shouldMatchSomePermissions = false,
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceDataByType?: TSelectDataFenceDataByType;
  shouldMatchSomePermissions: boolean;
}) => {
  const actualPermissions = useApplicationContext<TPermissions | null>(
    applicationContext => applicationContext.permissions
  );
  const actualActionRights = useApplicationContext<TActionRights | null>(
    applicationContext => applicationContext.actionRights
  );
  const actualDataFences = useApplicationContext<TDataFences | null>(
    applicationContext => applicationContext.dataFences
  );

  // Check first for data fences
  if (actualDataFences && demandedDataFences && demandedDataFences.length > 0) {
    if (!selectDataFenceDataByType) {
      reportErrorToSentry(
        new Error(
          `@commercetools-frontend/permissions/Authorized: Missing data fences selector "selectDataFenceDataByType".`
        )
      );
      return false;
    }
    return hasAppliedDataFence({
      demandedDataFences: demandedDataFences,
      actualDataFences: actualDataFences,
      selectDataFenceDataByType: selectDataFenceDataByType,
    });
  }

  // If no data fences have been provided, fall back to normal permissions + action rights.
  const hasDemandedPermissions = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  const hasDemandedActionRights = hasEveryActionRight(
    demandedActionRights || [],
    actualActionRights
  );

  return hasDemandedPermissions && hasDemandedActionRights;
};

export default useIsAuthorized;
