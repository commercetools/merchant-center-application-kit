import { fake, Generator } from '@commercetools-test-data/core';
import ApplicationNavbarMenu from '../application-navbar-menu';
import type { TNavbarMenuGroup } from './types';

const generator = Generator<TNavbarMenuGroup>({
  fields: {
    key: fake((f) => String(f.number.int(9))),
    items: fake(() => ApplicationNavbarMenu.buildList(1)),
  },
});

export default generator;
