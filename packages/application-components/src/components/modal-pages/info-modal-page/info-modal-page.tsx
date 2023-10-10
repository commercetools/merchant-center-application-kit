import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import type { CSSObject } from '@emotion/react';
import PageHeader from '../../internals/page-header';
import { ContentWrapper } from '../../internals/page.styles';
import ModalPage from '../internals/modal-page';

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
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  level?: number;
  title: string;
  isOpen: boolean;
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
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
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    currentPathLabel={props.topBarCurrentPathLabel || props.title}
    previousPathLabel={props.topBarPreviousPathLabel}
    shouldDelayOnClose={props.shouldDelayOnClose}
    getParentSelector={props.getParentSelector}
    afterOpenStyles={props.afterOpenStyles}
    customViewLocatorCode={props.customViewLocatorCode}
  >
    <PageHeader title={props.title} subtitle={props.subtitle} />
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
InfoModalPage.displayName = 'InfoModalPage';

export default InfoModalPage;
