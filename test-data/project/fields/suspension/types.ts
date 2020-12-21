export enum TProjectSuspensionReason {
  Other = 'Other',
  Payment = 'Payment',
  TemporaryMaintenance = 'TemporaryMaintenance',
}

export type TProjectSuspension = {
  isActive: boolean;
  reason: TProjectSuspensionReason | undefined;
};

export type TProjectSuspensionGraphql = TProjectSuspension & {
  __typename: 'ProjectSuspension';
};
