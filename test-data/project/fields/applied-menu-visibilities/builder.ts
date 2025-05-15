import type { TBuilder } from '@commercetools/composable-commerce-test-data/core';

import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TMenuVisibilities } from './types';

const AppliedMenuVisibilities = (): TBuilder<TMenuVisibilities> =>
  Builder<TMenuVisibilities>({
    generator,
    transformers,
  });

export default AppliedMenuVisibilities;
