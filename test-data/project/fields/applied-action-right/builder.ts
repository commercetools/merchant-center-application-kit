import type { TAppliedActionRight } from '../../types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedActionRight = (): TBuilder<TAppliedActionRight> =>
  Builder<TAppliedActionRight>({
    generator,
    transformers,
  });

export default AppliedActionRight;
