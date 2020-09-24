import type { TBuilder } from '@commercetools-test-data/core';
import type { TActionRights } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedActionRight = (): TBuilder<TActionRights> =>
  Builder<TActionRights>({
    generator,
    transformers,
  });

export default AppliedActionRight;
