import type { TBuilder } from '@commercetools-test-data/core';
import type { TNavbarMenuGroup as TMcProxyNavbarMenuGroup } from '../../../packages/application-shell/src/types/generated/proxy';

export type TNavbarMenuGroupGraphql = TMcProxyNavbarMenuGroup;

export type TNavbarMenuGroup = Omit<TNavbarMenuGroupGraphql, '__typename'>;

export type TNavbarMenuGroupBuilder = TBuilder<TNavbarMenuGroup>;
export type TCreateNavbarMenuGroupBuilder = () => TNavbarMenuGroupBuilder;
