import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { designTokens as appKitDesignTokens } from '../../theming';

const TabControls = styled.div`
  margin-top: ${uiKitDesignTokens.spacingS};
`;

type TControlsContainterProps = {
  tabControls: ReactNode;
  formControls?: ReactNode;
  children?: never;
};

const ControlsContainter = (props: TControlsContainterProps) => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: ${appKitDesignTokens.marginTopForTabControls};
    `}
  >
    <TabControls role="tablist">{props.tabControls}</TabControls>
    {props.formControls}
  </div>
);
ControlsContainter.displayName = 'ControlsContainter';

type TTabularPageContainerProps = {
  children: ReactNode;
  color: 'surface' | 'neutral';
};

const TabularPageContainer = (props: TTabularPageContainerProps) => (
  <div
    css={css`
      background-color: ${props.color === 'surface'
        ? uiKitDesignTokens.colorSurface
        : appKitDesignTokens.backgroundColorForPageHeader};
      padding: ${appKitDesignTokens.paddingForTabularPageHeader};
      border-bottom: ${appKitDesignTokens.borderBottomForTabularPageHeader};
    `}
  >
    {props.children}
  </div>
);
TabularPageContainer.displayName = 'TabularPageContainer';
const defaultProps: Pick<TTabularPageContainerProps, 'color'> = {
  color: 'surface',
};
TabularPageContainer.defaultProps = defaultProps;

const FormControlsContainer = styled.div`
  margin-bottom: ${uiKitDesignTokens.spacingM};
`;

const TabularPageCustomViewsSelectorWrapper = styled.div`
  margin: ${appKitDesignTokens.marginForCustomViewsSelectorAsTabular};
`;

export {
  ControlsContainter,
  TabularPageContainer,
  FormControlsContainer,
  TabularPageCustomViewsSelectorWrapper,
};
