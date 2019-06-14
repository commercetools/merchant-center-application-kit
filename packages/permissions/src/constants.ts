export type TPermissionNames = {
  [key: string]: string;
};

const defaultPermissions = {
  ManageProject: 'ManageProject',
  ManageCustomers: 'ManageCustomers',
  ManageOrders: 'ManageOrders',
  ManageProducts: 'ManageProducts',
  ManageOauthClients: 'ManageOauthClients',
  ManageStates: 'ManageStates',
  ManageTypes: 'ManageTypes',
  ViewCustomers: 'ViewCustomers',
  ViewOrders: 'ViewOrders',
  ViewProducts: 'ViewProducts',
  ViewStates: 'ViewStates',
  ViewTypes: 'ViewTypes',
};

type TPermissionNamesWithDefaults = typeof defaultPermissions &
  TPermissionNames;

const permissions: TPermissionNamesWithDefaults = defaultPermissions;

/* eslint-disable import/prefer-default-export */
export { permissions };
