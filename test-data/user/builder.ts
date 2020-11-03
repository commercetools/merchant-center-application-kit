import type { TCreateUserBuilder, TUser } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const User: TCreateUserBuilder = () =>
  Builder<TUser>({
    generator,
    transformers,
  });

export default User;
