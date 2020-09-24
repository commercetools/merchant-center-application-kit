import type { TBuilder } from '@commercetools-test-data/core';
import type { TProjectSuspension } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const ProjectSuspension = (): TBuilder<TProjectSuspension> =>
  Builder<TProjectSuspension>({
    generator,
    transformers,
  });

export default ProjectSuspension;
