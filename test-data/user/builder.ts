import type { TCreateUserBuilder, TUser } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const User: TCreateUserBuilder = ({ defaults } = {}) =>
  Builder<TUser>({
    generator,
    transformers,
    defaults,
  });

export default User;
