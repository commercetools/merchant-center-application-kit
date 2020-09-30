export type TProjectExpiry = {
  isActive: boolean;
  daysLeft?: number;
};

export type TProjectExpiryGraphql = TProjectExpiry & {
  __typename: 'ProjectExpiry';
};
