import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CustomViewData } from '@commercetools-frontend/constants';
import Constraints from '@commercetools-uikit/constraints';
import { designTokens } from '@commercetools-uikit/design-system';
import { SidebarCollapseIcon } from '@commercetools-uikit/icons';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CustomViewLoader from '../custom-view-loader';
import { useCustomViewsConnector } from './use-custom-views-connector';

const COMPONENT_HEIGHT = '56px';

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
  background-color: ${designTokens.colorAccent98};
  padding: ${designTokens.spacing25} ${designTokens.spacing60};
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
    // TODO: add error handling
    console.error(
      `Error fetching Custom Views for locator: "${props.customViewLocatorCode}".`,
      error
    );
    return null;
  }

  return (
    <Wrapper shouldRender={customViews.length > 0}>
      <Container>
        <Constraints.Horizontal max="scale">
          <Spacings.Inline
            scale="m"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Spacings.Inline scale="xs" alignItems="center">
              <SidebarCollapseIcon size="medium" color="neutral60" />
              <Text.Detail tone="secondary">Custom Views:</Text.Detail>
            </Spacings.Inline>
            {customViews.map((customView) => (
              <SecondaryButton
                key={customView.id}
                label={customView.defaultLabel}
                size="medium"
                onClick={() => {
                  setSelectedCustomView(customView);
                }}
              />
            ))}
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
