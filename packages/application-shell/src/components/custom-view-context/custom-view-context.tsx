import { createContext, type ReactNode, useContext, useMemo } from 'react';

/*
  TODO: These types are temporary until we have the proper
  ones generated from the Settings schema
*/
export type TPermissionGroup = {
  name: string;
  oAuthScopes: string[];
};

export type TCustomView = {
  id: string;
  defaultLabel: string;
  labelAllLocales: Record<string, string>;
  url: string;
  type: 'CustomPanel' | 'CustomTab';
  typeConfig?: {
    size?: 'SMALL' | 'LARGE';
  };
  locators: string[];
  permissions: TPermissionGroup[];
};

type TCustomViewContext = {
  config: TCustomView;
};

type TCustomViewContextProviderProps = {
  config: TCustomView;
  children: ReactNode;
};

const CustomViewContext = createContext<TCustomViewContext>({
  config: {
    id: '',
    defaultLabel: '',
    labelAllLocales: {},
    url: '',
    type: 'CustomPanel',
    locators: [],
    permissions: [],
  },
});

export const CustomViewContextProvider = (
  props: TCustomViewContextProviderProps
) => {
  const contextValue = useMemo<TCustomViewContext>(
    () => ({ config: props.config }),
    [props.config]
  );
  return (
    <CustomViewContext.Provider value={contextValue}>
      {props.children}
    </CustomViewContext.Provider>
  );
};

export const useCustomViewContext = (): TCustomViewContext => {
  const context = useContext(CustomViewContext);
  if (!context) {
    throw new Error(
      'useCustomViewContext must be used within a CustomViewContextProvider'
    );
  }
  return context;
};
