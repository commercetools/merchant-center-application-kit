import React from 'react';
import { MessageDescriptor } from 'react-intl';
import ModalPage from '../internals/modal-page';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';

type Label = string | MessageDescriptor;
type Props = {
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
  zIndex?: number;
  baseZIndex?: number;
  getParentSelector?: () => HTMLElement;
  shouldDelayOnClose?: boolean;
  // TopBar Props
  topBarCurrentPathLabel?: string;
  topBarPreviousPathLabel?: Label;
  // Header Props
  subtitle?: string | React.ReactElement;
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
  >
    <ModalPageHeader title={props.title} subtitle={props.subtitle} />
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
InfoModalPage.displayName = 'InfoModalPage';

export default InfoModalPage;
