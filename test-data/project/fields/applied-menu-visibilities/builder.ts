import type { TBuilder } from '@commercetools-test-data/core';
import type { TMenuVisibilities } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedMenuVisibilities = (): TBuilder<TMenuVisibilities> =>
  Builder<TMenuVisibilities>({
    generator,
    transformers,
  });

export default AppliedMenuVisibilities;
