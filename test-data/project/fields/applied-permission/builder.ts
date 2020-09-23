import type { TAppliedPermission } from '../../types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedPermission = (): TBuilder<TAppliedPermission> =>
  Builder<TAppliedPermission>({
    generator,
    transformers,
  });

export default AppliedPermission;
