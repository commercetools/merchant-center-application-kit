import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TCreateUserBuilder, TUser } from './types';

const User: TCreateUserBuilder = () =>
  Builder<TUser>({
    generator,
    transformers,
  });

export default User;
