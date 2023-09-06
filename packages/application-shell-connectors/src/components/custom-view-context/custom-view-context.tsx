import { createContext, type ReactNode, useContext, useMemo } from 'react';
import {
  type TCustomView,
  TCustomViewStatus,
  TCustomViewType,
} from '../../types/generated/settings';
import {
  type TApplicationContext,
  useApplicationContext,
} from '../application-context';

type TCustomViewContext = {
  hostUrl: string;
  config: TCustomView;
};

type TCustomViewContextProviderProps = {
  hostUrl: string;
  customViewConfig: TCustomView;
  children: ReactNode;
};

const CustomViewContext = createContext<TCustomViewContext>({
  hostUrl: '',
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
    () => ({
      hostUrl: props.hostUrl,
      config: props.customViewConfig,
    }),
    [props.hostUrl, props.customViewConfig]
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
