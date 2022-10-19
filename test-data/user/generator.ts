import type { TUser } from './types';

import { fake, sequence, Generator } from '@commercetools-test-data/core';

const generator = Generator<TUser>({
  fields: {
    id: fake((f) => f.datatype.uuid()),
    version: sequence(),
    createdAt: fake((f) => f.date.recent(2)),
    lastModifiedAt: fake((f) => f.date.recent(1)),
    email: fake((f) => f.internet.email()),
    firstName: fake((f) => f.name.firstName()),
    lastName: fake((f) => f.name.lastName()),
    language: 'en',
    numberFormat: 'en',
    timeZone: 'Europe/Berlin',
    businessRole: fake((f) => f.name.jobDescriptor()),
    defaultProjectKey: null,
    gravatarHash: fake((f) => f.internet.avatar()),
    launchdarklyTrackingId: '',
    launchdarklyTrackingGroup: '',
    launchdarklyTrackingSubgroup: '',
    launchdarklyTrackingTeam: '',
    launchdarklyTrackingTenant: '',
    projects: null,
    idTokenUserInfo: null,
    verificationStatus: 'Verified',
  },
});

export default generator;
