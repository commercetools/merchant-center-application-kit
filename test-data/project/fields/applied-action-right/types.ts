export type TActionRight = {
  [key: string]: boolean;
};

export type TActionRights = {
  [key: string]: TActionRight;
};

export type TAppliedActionRightsGraphql = {
  __typename: 'AppliedActionRight';
  name: string;
  value: boolean;
  group: string;
}[];
