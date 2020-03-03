import React from 'react';
import warning from 'tiny-warning';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
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
// NOTE: we currently can't use Mapped Types as the babel transfomer does not
// understand them yet: https://github.com/milesj/babel-plugin-typescript-to-proptypes/issues/23
// type TDataFences = {
//   // E.g. { store: {...} }
//   [key in TDataFenceType]: TDataFenceGroupedByResourceType;
// };
type TDataFences = {
  // E.g. { store: {...} }
  store?: TDataFenceGroupedByResourceType;
};
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

const useWarning = (condition: boolean, message: string) => {
  React.useEffect(() => {
    warning(condition, message);
  }, [condition, message]);
};

const useIsAuthorized = ({
  demandedPermissions,
  demandedActionRights,
  demandedDataFences,
  selectDataFenceData,
  shouldMatchSomePermissions = false,
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceData?: TSelectDataFenceData;
  shouldMatchSomePermissions?: boolean;
}) => {
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

  const actualPermissions = useApplicationContext<TPermissions | null>(
    applicationContext => applicationContext.permissions
  );
  const actualActionRights = useApplicationContext<TActionRights | null>(
    applicationContext => applicationContext.actionRights
  );
  const actualDataFences = useApplicationContext<TDataFences | null>(
    applicationContext => applicationContext.dataFences
  );

  // if the user has no permissions and no dataFences assigned to them, they are not authorized
  if (!actualPermissions && !actualDataFences) return false;

  let hasDemandeDataFences = false;
  if (demandedDataFences && demandedDataFences.length > 0) {
    if (!selectDataFenceData) {
      reportErrorToSentry(
        new Error(
          `@commercetools-frontend/permissions/Authorized: Missing data fences selector "selectDataFenceData".`
        )
      );
    }
    hasDemandeDataFences = hasSomeDataFence({
      actualPermissions,
      demandedDataFences,
      actualDataFences,
      selectDataFenceData,
    });
  }

  const hasDemandedPermissions = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  const hasDemandedActionRights = hasEveryActionRight(
    demandedActionRights || [],
    actualActionRights
  );

  return (
    hasDemandeDataFences || (hasDemandedPermissions && hasDemandedActionRights)
  );
};

export default useIsAuthorized;
