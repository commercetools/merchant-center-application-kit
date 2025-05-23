import type { TBuilder } from '@commercetools/composable-commerce-test-data/core';

import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TActionRights } from './types';

const AppliedActionRight = (): TBuilder<TActionRights> =>
  Builder<TActionRights>({
    generator,
    transformers,
  });

export default AppliedActionRight;
