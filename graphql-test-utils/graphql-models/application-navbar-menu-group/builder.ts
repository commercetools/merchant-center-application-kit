import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TNavbarMenuGroup, TCreateNavbarMenuGroupBuilder } from './types';

const Model: TCreateNavbarMenuGroupBuilder = () =>
  Builder<TNavbarMenuGroup>({
    generator,
    transformers,
  });

export default Model;
