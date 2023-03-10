import { LocalizedString } from '@commercetools-test-data/commons';
import { sequence, fake, Generator } from '@commercetools-test-data/core';
import { stateRoles, stateTypes } from './constants';

// https://docs.commercetools.com/api/projects/states#state
const generator = Generator({
  name: 'State',
  fields: {
    id: fake((f) => f.datatype.uuid()),
    key: fake((f) => f.lorem.slug(2)),
    version: sequence(),
    createdAt: fake((f) => f.date.recent(10)),
    createdBy: null,
    lastModifiedAt: fake((f) => f.date.recent(2)),
    lastModifiedBy: null,
    type: stateTypes.LineItemState,
    initial: true,
    builtIn: false,
    roles: [stateRoles.Return],
    name: fake(() => LocalizedString.random()),
    description: fake(() => LocalizedString.random()),
  },
});

export default generator;
