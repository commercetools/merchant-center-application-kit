import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { CustomViewData } from '@commercetools-frontend/constants';
import {
  type TApplicationContext,
  useApplicationContext,
} from '../application-context';

export type TCustomViewContext = {
  hostUrl: string;
  customViewConfig: CustomViewData;
};

export type TMergedContext = TApplicationContext<{}> & TCustomViewContext;

export type TCustomViewContextProviderProps = {
  hostUrl: string;
  customViewConfig: CustomViewData;
  children: ReactNode;
};

const Context = createContext({});

const CustomViewContextProvider = (props: TCustomViewContextProviderProps) => {
  const contextValue = useMemo<TCustomViewContext>(
    () => ({
      hostUrl: props.hostUrl,
      customViewConfig: props.customViewConfig,
    }),
    [props.hostUrl, props.customViewConfig]
  );
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

// Use function overloading to declare two possible signatures with two
// distict return types, based on the selector function argument.
function useCustomViewContextHook(): TMergedContext;
function useCustomViewContextHook<SelectedContext>(
  selector: (context: TMergedContext) => SelectedContext
): SelectedContext;

// Then implement the function. Typescript will pick the appropriate signature
// based on the function arguments.
function useCustomViewContextHook<SelectedContext>(
  selector?: (context: TMergedContext) => SelectedContext
) {
  // Because of the way the CustomViewShell configures the Context.Provider,
  // we ensure that, when we read from the context, we always get actual
  // context object and not the initial value.
  // Therefore, we can safely cast the value to be out `TCustomViewContext` type.
  const customViewContext = useContext(Context) as TCustomViewContext;
  const applicationContext = useApplicationContext();
  const mergedContext = { ...applicationContext, ...customViewContext };
  return selector ? selector(mergedContext) : mergedContext;
}

// This is a workaround to trick babel/rollup to correctly export the function.
// Most likely the problem arises with the use of overloading.
// See related issue: https://github.com/babel/babel/issues/8361
const useCustomViewContext = useCustomViewContextHook;

export { Context, CustomViewContextProvider, useCustomViewContext };
