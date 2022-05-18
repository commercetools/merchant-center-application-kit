declare module '@commercetools/sync-actions' {
  type Action = { action: string; [x: string]: unknown };
  type BuildActions = (nextDraft: unknown, originalDraft: unknown) => Action[];
  export const createSyncChannels: () => { buildActions: BuildActions };
}
