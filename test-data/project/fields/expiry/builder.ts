import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TProjectExpiry } from './types';

const ProjectExpiry = (): TBuilder<TProjectExpiry> =>
  Builder<TProjectExpiry>({
    generator,
    transformers,
  });

export default ProjectExpiry;
