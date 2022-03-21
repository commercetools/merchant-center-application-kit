import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { ReactNode } from 'react';

type TTabControlsProps = {
  children: ReactNode;
};

const TabControls = (props: TTabControlsProps) => (
  <div
    css={css`
      margin-top: ${customProperties.spacingS};
    `}
    role="tablist"
  >
    {props.children}
  </div>
);
TabControls.displayName = 'TabControls';

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
    `}
  >
    <TabControls>{props.tabControls}</TabControls>
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
        ? customProperties.colorSurface
        : customProperties.colorNeutral95};
      padding: ${customProperties.spacingM} ${customProperties.spacingM} 0;
      border-bottom: 1px ${customProperties.colorNeutral} solid;
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

export { ControlsContainter, TabularPageContainer };
