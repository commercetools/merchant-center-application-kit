import type { TProject } from './types';

import slugify from '@sindresorhus/slugify';
import { fake, sequence, Generator } from '@commercetools-test-data/core';

const generator = Generator<TProject>({
  name: 'Project',
  fields: {
    id: fake((f) => f.random.uuid()),
    version: sequence(),
    createdAt: fake((f) => f.date.recent(2)),
    lastModifiedAt: fake((f) => f.date.recent(1)),
    name: fake((f) => f.company.companyName()),
    key: '',
  },
  postBuild: (project) => {
    project.key = slugify(project.name);
    return project;
  },
});

export default generator;
