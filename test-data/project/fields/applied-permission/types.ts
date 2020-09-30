export type TPermissions = { [key: string]: boolean };

export type TAppliedPermissionGraphql = {
  __typename: 'AppliedPermission';
  name: string;
  value: boolean;
}[];
