import type { TBuilder } from '@commercetools-test-data/core';
import type { TProjectExpiry } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const ProjectExpiry = (): TBuilder<TProjectExpiry> =>
  Builder<TProjectExpiry>({
    generator,
    transformers,
  });

export default ProjectExpiry;
