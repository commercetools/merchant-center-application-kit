import type { TBuilder } from '@commercetools/composable-commerce-test-data/core';

import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TProjectSuspension } from './types';

const ProjectSuspension = (): TBuilder<TProjectSuspension> =>
  Builder<TProjectSuspension>({
    generator,
    transformers,
  });

export default ProjectSuspension;
