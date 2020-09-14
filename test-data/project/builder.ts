import type { TCreateProjectBuilder, TProject } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const User: TCreateProjectBuilder = ({ defaults } = {}) =>
  Builder<TProject>({
    generator,
    transformers,
    defaults,
  });

export default User;
