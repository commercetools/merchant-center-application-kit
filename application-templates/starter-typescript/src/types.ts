import type { TChannelRole } from '../types/generated/ctp';

export type TFormValues = {
  key: string;
  name: Record<string, string>;
  roles: TChannelRole[];
};
