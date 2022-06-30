declare module '@commercetools/sync-actions' {
  export type SyncAction = { action: string; [x: string]: unknown };
  function buildActions<NextDraft, OriginalDraft>(
    nextDraft: NextDraft,
    originalDraft: OriginalDraft
  ): SyncAction[];
  export type Syncer = {
    buildActions: typeof buildActions;
  };
  export function createSyncChannels(): Syncer;
}
