import { fake, sequence, Generator } from '@commercetools-test-data/core';
import type { TUser } from './types';

const generator = Generator<TUser>({
  fields: {
    id: fake((f) => f.string.uuid()),
    version: sequence(),
    createdAt: fake((f) => f.date.recent({ days: 2 })),
    lastModifiedAt: fake((f) => f.date.recent({ days: 1 })),
    email: fake((f) => f.internet.email()),
    firstName: fake((f) => f.person.firstName()),
    lastName: fake((f) => f.person.lastName()),
    language: 'en',
    numberFormat: 'en',
    timeZone: 'Europe/Berlin',
    businessRole: fake((f) => f.person.jobDescriptor()),
    defaultProjectKey: null,
    gravatarHash: fake((f) => f.internet.avatar()),
    launchdarklyTrackingId: '',
    launchdarklyTrackingGroup: '',
    launchdarklyTrackingSubgroup: '',
    launchdarklyTrackingTeam: '',
    launchdarklyTrackingCloudEnvironment: '',
    projects: null,
    idTokenUserInfo: null,
  },
});

export default generator;
