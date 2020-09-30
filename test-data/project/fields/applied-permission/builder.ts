import type { TBuilder } from '@commercetools-test-data/core';
import type { TPermissions } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedPermission = (): TBuilder<TPermissions> =>
  Builder<TPermissions>({
    generator,
    transformers,
  });

export default AppliedPermission;
