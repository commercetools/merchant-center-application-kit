import type { CSSObject } from '@emotion/react';

import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import ModalPage from '../internals/modal-page';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
type Props = {
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  baseZIndex?: number;
  getParentSelector?: () => HTMLElement;
  shouldDelayOnClose?: boolean;
  afterOpenStyles?: string | CSSObject;
  // TopBar Props
  topBarCurrentPathLabel?: string;
  topBarPreviousPathLabel?: Label;
  // Header Props
  subtitle?: string | ReactElement;
};

const InfoModalPage = (props: Props) => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    currentPathLabel={props.topBarCurrentPathLabel || props.title}
    previousPathLabel={props.topBarPreviousPathLabel}
    shouldDelayOnClose={props.shouldDelayOnClose}
    getParentSelector={props.getParentSelector}
    afterOpenStyles={props.afterOpenStyles}
  >
    <ModalPageHeader title={props.title} subtitle={props.subtitle} />
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
InfoModalPage.displayName = 'InfoModalPage';

export default InfoModalPage;
