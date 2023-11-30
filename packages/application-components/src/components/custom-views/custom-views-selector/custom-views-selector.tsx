import {
  useEffect,
  useState,
  Fragment,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { CustomViewData } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import Constraints from '@commercetools-uikit/constraints';
import { designTokens } from '@commercetools-uikit/design-system';
import { WindowEyeIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CustomViewLoader from '../custom-view-loader';
import messages from './messages';
import { useCustomViewsConnector } from './use-custom-views-connector';

const COMPONENT_HEIGHT = '44px';

type TCustomViewSelectorBaseProps = {
  onCustomViewsResolved?: (customViews: CustomViewData[]) => void;
};
type TCustomViewSelectorProps = TCustomViewSelectorBaseProps & {
  customViewLocatorCode?: string;
};
type TCustomViewSelectorWithRequiredProps = TCustomViewSelectorBaseProps & {
  customViewLocatorCode: string;
};

type TWrapperProps = {
  shouldRender: boolean;
};
const Wrapper = styled.div<TWrapperProps>`
  height: ${(props) => (props.shouldRender ? COMPONENT_HEIGHT : '0')};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const Container = styled.div`
  background: linear-gradient(
      0deg,
      ${designTokens.colorNeutral95},
      ${designTokens.colorNeutral95}
    ),
    linear-gradient(
      0deg,
      ${designTokens.colorNeutral98},
      ${designTokens.colorNeutral98}
    );
  padding: 7px ${designTokens.spacing20};
  border: 1px solid ${designTokens.colorNeutral95};
  border-radius: ${designTokens.borderRadius8};
`;

const hoverAndSelectedStateStyles = css`
  box-shadow: ${designTokens.shadow1};
  background-color: ${designTokens.colorSurface};
  color: ${designTokens.colorPrimary30};
`;

type TCustomViewSelectorItemProps = {
  selected?: boolean;
  label: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const CustomViewSelectorItem = (props: TCustomViewSelectorItemProps) => {
  return (
    <AccessibleButton
      css={css`
        display: flex;
        align-items: center;
        padding: ${designTokens.spacing20} ${designTokens.spacing25};
        height: 30px;
        border-radius: ${designTokens.borderRadius6};
        color: ${designTokens.colorPrimary};
        ${props.selected && hoverAndSelectedStateStyles}

        :hover {
          ${hoverAndSelectedStateStyles};
        }
      `}
      onClick={props.onClick}
      label={props.label}
    >
      <Text.Detail
        tone="inherit"
        fontWeight={props.selected ? 'bold' : 'regular'}
      >
        {props.label}
      </Text.Detail>
    </AccessibleButton>
  );
};

const Separator = styled.span`
  width: 1px;
  height: 18px;
  background-color: #cccccc;
`;

function CustomViewSelector(props: TCustomViewSelectorWithRequiredProps) {
  const [selectedCustomView, setSelectedCustomView] =
    useState<CustomViewData | null>(null);
  const { customViews, error, loading } = useCustomViewsConnector({
    customViewLocatorCode: props.customViewLocatorCode,
  });

  const { onCustomViewsResolved } = props;
  useEffect(() => {
    if (!loading && !error && onCustomViewsResolved) {
      onCustomViewsResolved(customViews);
    }
  }, [customViews, error, loading, onCustomViewsResolved]);
  if (error) {
    reportErrorToSentry(error, {
      extra: {
        customViewLocatorCode: props.customViewLocatorCode,
      },
    });
    return null;
  }

  return (
    <Wrapper shouldRender={customViews.length > 0}>
      <Container>
        <Constraints.Horizontal max="scale">
          <Spacings.Inline
            scale="s"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Spacings.Inline scale="xs" alignItems="center">
              <WindowEyeIcon size="medium" color="neutral60" />
              <div
                css={css`
                  div {
                    font-weight: 300;
                  }
                `}
              >
                <Text.Detail tone="secondary" intlMessage={messages.title} />
              </div>
            </Spacings.Inline>
            {customViews.map((customView, index) => {
              const isNotLastItem = index !== customViews.length - 1;
              return (
                <Fragment key={customView.id}>
                  <CustomViewSelectorItem
                    selected={selectedCustomView?.id === customView.id}
                    onClick={() => {
                      setSelectedCustomView(customView);
                    }}
                    label={customView.defaultLabel}
                  />
                  {isNotLastItem && <Separator />}
                </Fragment>
              );
            })}
          </Spacings.Inline>

          {selectedCustomView && (
            <CustomViewLoader
              customView={selectedCustomView}
              onClose={() => {
                setSelectedCustomView(null);
              }}
            />
          )}
        </Constraints.Horizontal>
      </Container>
    </Wrapper>
  );
}
CustomViewSelector.displayName = 'CustomViewSelector';

const CustomViewSelectorOrNothing = (props: TCustomViewSelectorProps) => {
  if (!props.customViewLocatorCode) {
    return null;
  }
  return (
    <CustomViewSelector
      {...props}
      customViewLocatorCode={props.customViewLocatorCode}
    />
  );
};

export default CustomViewSelectorOrNothing;
