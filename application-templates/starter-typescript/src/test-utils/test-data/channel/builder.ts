import { Builder } from '@commercetools-test-data/core';
import type { TChannel } from '@commercetools-test-data/channel/dist/declarations/src/types';
import generator from './generator';
import transformers from './transformers';

const Channel = () =>
  Builder<TChannel>({
    generator,
    transformers,
  });

export default Channel;
