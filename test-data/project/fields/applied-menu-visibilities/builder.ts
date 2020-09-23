import type { TAppliedMenuVisibilities } from '../../types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedMenuVisibilities = (): TBuilder<TAppliedMenuVisibilities> =>
  Builder<TAppliedMenuVisibilities>({
    generator,
    transformers,
  });

export default AppliedMenuVisibilities;
