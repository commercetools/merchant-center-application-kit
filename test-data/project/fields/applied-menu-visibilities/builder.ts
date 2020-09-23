import type { TMenuVisibilities } from './types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedMenuVisibilities = (): TBuilder<TMenuVisibilities> =>
  Builder<TMenuVisibilities>({
    generator,
    transformers,
  });

export default AppliedMenuVisibilities;
