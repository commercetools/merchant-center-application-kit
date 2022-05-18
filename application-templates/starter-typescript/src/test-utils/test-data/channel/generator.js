import { sequence, fake, Generator } from '@commercetools-test-data/core';
import { LocalizedString } from '@commercetools-test-data/commons';
import { CHANNEL_ROLES } from '../../../components/channel-details/constants';

// https://docs.commercetools.com/api/projects/channels#channel
const generator = Generator({
  name: 'Channel',
  fields: {
    id: fake((f) => f.datatype.uuid()),
    key: fake((f) => f.lorem.slug(2)),
    version: sequence(),
    createdAt: fake((f) => f.date.recent(10)),
    createdBy: null,
    lastModifiedAt: fake((f) => f.date.recent(2)),
    lastModifiedBy: null,
    roles: [CHANNEL_ROLES.primary],
    name: fake(() => LocalizedString.random()),
    description: fake(() => LocalizedString.random()),
    address: null,
    reviewRatingStatistics: null,
    custom: null,
    geoLocation: null,
  },
});

export default generator;
