import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Constraints from '@commercetools-uikit/constraints';
import { designTokens } from '@commercetools-uikit/design-system';
import { SidebarCollapseIcon } from '@commercetools-uikit/icons';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { TCustomView } from '../../types/generated/settings';
import CustomViewLoader from '../custom-view-loader';
import { useCustomViewsConnector } from './use-custom-views-connector';

const COMPONENT_HEIGHT = '56px';

type TCustmoViewSelectorProps = {
  customViewLocatorCode?: string;
  onCustomViewsResolved?: (customViews: TCustomView[]) => void;
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

function CustomViewSelector(props: TCustmoViewSelectorProps) {
  const { customViewLocatorCode, onCustomViewsResolved } = props;
  const [selectedCustomView, setSelectedCustomView] =
    useState<TCustomView | null>(null);
  const { customViews, error, loading } = useCustomViewsConnector({
    customViewLocatorCode,
  });

  useEffect(() => {
    if (!loading && !error && onCustomViewsResolved) {
      onCustomViewsResolved(customViews);
    }
  }, [customViews, error, loading, onCustomViewsResolved]);

  const openCustomView = useCallback((customView: TCustomView) => {
    setSelectedCustomView(customView);
  }, []);

  const onCustomViewClosed = useCallback(() => {
    setSelectedCustomView(null);
  }, []);

  if (!props.customViewLocatorCode) {
    return null;
  }

  if (error) {
    // TODO: add error handling
    console.error(
      `Error fetching Custom Views for locator: "${props.customViewLocatorCode}".`,
      error
    );
    return null;
  }

  return (
    <Wrapper shouldRender={customViews.length > 1}>
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
                onClick={() => openCustomView(customView)}
              />
            ))}
          </Spacings.Inline>

          {Boolean(selectedCustomView) && (
            <CustomViewLoader
              customView={selectedCustomView}
              onClose={onCustomViewClosed}
            />
          )}
        </Constraints.Horizontal>
      </Container>
    </Wrapper>
  );
}

export default CustomViewSelector;
