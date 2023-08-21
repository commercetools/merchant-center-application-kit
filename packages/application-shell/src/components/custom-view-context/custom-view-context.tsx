import { createContext, type ReactNode, useContext, useMemo } from 'react';
import {
  type TCustomView,
  TCustomViewStatus,
  TCustomViewType,
} from '../../types/generated/settings';

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
    type: TCustomViewType.CustomPanel,
    locators: [],
    permissions: [],
    createdAt: '',
    installedBy: [],
    owner: {
      createdAt: '',
      id: '',
      organizationId: '',
      updatedAt: '',
    },
    ownerId: '',
    status: TCustomViewStatus.Draft,
    updatedAt: '',
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
