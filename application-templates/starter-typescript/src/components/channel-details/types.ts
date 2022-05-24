import type { TChannelRole } from '../../../types/generated/ctp';

export type FormValues = {
  key: string;
  name: Record<string, string>;
  roles: TChannelRole[];
};

export type ActionData = {
  [key in
    | 'key'
    | 'name'
    | 'description'
    | 'address'
    | 'geoLocation'
    | 'roles']?: unknown;
};
