export type TProjectExpiry = {
  isActive: boolean;
  daysLeft: number | undefined;
};

export type TProjectExpiryGraphql = TProjectExpiry & {
  __typename: 'ProjectExpiry';
};
