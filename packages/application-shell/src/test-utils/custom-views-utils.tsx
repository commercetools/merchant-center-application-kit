import { type ReactNode, useEffect, useRef } from 'react';
import { type RenderResult, render } from '@testing-library/react';
import {
  CUSTOM_VIEWS_EVENTS_META,
  CUSTOM_VIEWS_EVENTS_NAMES,
} from '@commercetools-frontend/constants';
import CustomViewShell from '../components/custom-view-shell';
import {
  type TCustomView,
  TCustomViewStatus,
  TCustomViewType,
} from '../types/generated/settings';

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

type TCustomViewTestWrapperProps = {
  customViewId: string;
  locale: string;
  projectKey?: string;
  customViewConfig?: Partial<TCustomView>;
  children: ReactNode;
};
function CustomViewTestWrapper(props: TCustomViewTestWrapperProps) {
  const iFrameCommunicationChannel = useRef(new MessageChannel());

  useEffect(() => {
    // Transfer port2 to the iFrame so we can send messages privately
    window.postMessage(CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP, '*', [
      iFrameCommunicationChannel.current.port2,
    ]);

    // Send the initialization message to the iFrame
    iFrameCommunicationChannel.current.port1.postMessage({
      source: CUSTOM_VIEWS_EVENTS_META.SOURCE,
      destination: `${CUSTOM_VIEWS_EVENTS_META.DESTINATION_PREFIX}${props.customViewId}`,
      eventName: CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_INITIALIZATION,
      eventData: {
        context: {
          dataLocale: props.locale,
          customViewConfig: Object.assign(
            {},
            testCustomViewData,
            props.customViewConfig
          ),
          hostUrl: window.location.href,
          userLocale: props.locale,
          projectKey: props.projectKey,
        },
      },
    });
  }, [
    props.customViewConfig,
    props.customViewId,
    props.locale,
    props.projectKey,
  ]);

  // Required so Jest does not get stuck after the test is done.
  useEffect(
    () => () => {
      iFrameCommunicationChannel.current.port1.close();
      iFrameCommunicationChannel.current.port2?.close();
    },
    []
  );

  return (
    <CustomViewShell customViewId={props.customViewId} messages={{}}>
      {props.children}
    </CustomViewShell>
  );
}

type TRenderCustomViewParams = TCustomViewTestWrapperProps;
export const renderCustomView = (
  props: TRenderCustomViewParams
): RenderResult => {
  return render(
    <CustomViewTestWrapper
      customViewId={props.customViewId}
      locale={props.locale}
      projectKey={props.projectKey}
      customViewConfig={props.customViewConfig}
    >
      {props.children}
    </CustomViewTestWrapper>
  );
};
