import type { TProject } from './types';

import faker from 'faker';
import { fake, sequence, Generator } from '@commercetools-test-data/core';

const generator = Generator<TProject>({
  fields: {
    id: fake((f) => f.datatype.uuid()),
    version: sequence(),
    createdAt: fake((f) => f.date.recent(2)),
    lastModifiedAt: fake((f) => f.date.recent(1)),
    name: fake((f) => f.company.companyName()),
    key: '',
    countries: ['de'],
    currencies: ['EUR'],
    languages: ['de'],
    initialized: fake(() => true),
    // The following fields are built in the builder
    owner: null,
    suspension: null,
    expiry: null,
    permissions: null,
    actionRights: null,
    menuVisibilities: null,
    dataFences: null,
  },
  postBuild: (project) => {
    project.key = faker.helpers.slugify(project.name);
    return project;
  },
});

export default generator;
