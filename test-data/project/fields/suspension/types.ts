export type TProjectSuspension = {
  isActive: boolean;
  reason?: string;
};

export type TProjectSuspensionGraphql = TProjectSuspension & {
  __typename: 'ProjectSuspension';
};
