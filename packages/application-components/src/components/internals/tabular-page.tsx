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
      margin-top: ${uiKitDesignTokens.spacing40};
    `}
  >
    <TabControls role="tablist">{props.tabControls}</TabControls>
    {props.formControls}
  </div>
);
ControlsContainter.displayName = 'ControlsContainter';

const TabularPageContainer = styled.div`
  background-color: ${uiKitDesignTokens.colorSurface};
  padding: ${appKitDesignTokens.paddingForTabularPageHeader};
  border-bottom: 1px solid ${uiKitDesignTokens.colorNeutral90};
`;

const FormControlsContainer = styled.div`
  margin-bottom: ${uiKitDesignTokens.spacingM};
`;

const CustomViewsSelectorWrapper = styled.div`
  margin: ${appKitDesignTokens.marginForCustomViewsSelectorAsTabular};
`;

const TabularModalPageContainer = styled.div`
  ${TabularPageContainer} {
    padding: ${appKitDesignTokens.paddingForTabularModalPageHeader};
  }
`;

export {
  ControlsContainter,
  TabularPageContainer,
  TabularModalPageContainer,
  FormControlsContainer,
  CustomViewsSelectorWrapper,
};
