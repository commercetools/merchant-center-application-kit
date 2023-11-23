import type {
  TCustomViewContextProviderProps as CustomViewContextProviderProps,
  TCustomViewContext as CustomViewContext,
} from './custom-view-context';

export type TCustomViewContextProviderProps = CustomViewContextProviderProps;
export type TCustomViewContext = CustomViewContext;

export {
  CustomViewContextProvider,
  useCustomViewContext,
} from './custom-view-context';
