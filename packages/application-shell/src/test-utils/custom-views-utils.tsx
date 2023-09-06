import { type ReactNode } from 'react';
import { type RenderResult } from '@testing-library/react';
import { CustomViewContextProvider } from '@commercetools-frontend/application-shell-connectors/src/components/custom-view-context';
import {
  type TCustomView,
  TCustomViewStatus,
  TCustomViewType,
} from '../types/generated/settings';
import { renderApp } from './test-utils';

const testCustomViewData = {
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
};

type TRenderCustomViewParams = {
  locale: string;
  projectKey?: string;
  customViewConfig?: Partial<TCustomView>;
  children: ReactNode;
};

export const renderCustomView = (
  props: TRenderCustomViewParams
): RenderResult => {
  return renderApp(
    <CustomViewContextProvider
      hostUrl=""
      customViewConfig={{ ...testCustomViewData, ...props.customViewConfig }}
    >
      {props.children}
    </CustomViewContextProvider>,
    {
      locale: props.locale,
      project: {
        key: props.projectKey,
      },
    }
  );
};
