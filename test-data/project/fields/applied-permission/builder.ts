import type { TBuilder } from '@commercetools/composable-commerce-test-data/core';

import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TPermissions } from './types';

const AppliedPermission = (): TBuilder<TPermissions> =>
  Builder<TPermissions>({
    generator,
    transformers,
  });

export default AppliedPermission;
