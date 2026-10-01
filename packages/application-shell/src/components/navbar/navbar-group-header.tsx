import styled from '@emotion/styled';
import { Badge, NimbusProvider } from '@commercetools/nimbus';
import { useIntl } from 'react-intl';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';
import messages from './messages';

type NavbarGroupHeaderProps = {
  label: string;
  isNew?: boolean;
};

const GroupLabel = styled.div`
  font-size: ${uiKitDesignTokens.fontSize10};
  font-weight: ${uiKitDesignTokens.fontWeight600};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${uiKitDesignTokens.colorSurface};
  height: ${NAVBAR.itemSize};
  width: calc(
    ${NAVBAR.sublistIndentationWhenExpanded} - 2 *
      ${uiKitDesignTokens.spacing25}
  );
  padding: ${uiKitDesignTokens.spacing30};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${uiKitDesignTokens.spacing30};
`;

/**
 * Whether `@commercetools/nimbus` actually resolved at build time. When an app
 * has not installed Nimbus, the mc-scripts bundler fallback stubs the import to
 * an empty module, so the bindings above are `undefined`.
 */
const hasNimbus = typeof NimbusProvider !== 'undefined';

const NavbarGroupHeader = ({ label, isNew }: NavbarGroupHeaderProps) => {
  const intl = useIntl();

  return (
    <GroupLabel>
      <span>{label}</span>
      {/* The NavBar also renders while the lazy splitter chunk (which owns the
          shell's NimbusProvider) is still loading, so the badge brings its
          own provider. Nimbus supports nested providers. */}
      {isNew && hasNimbus && (
        <NimbusProvider locale={intl.locale} loadFonts={false}>
          <Badge colorPalette="primary" size="2xs">
            {intl.formatMessage(messages['NavBar.Group.badge.new'])}
          </Badge>
        </NimbusProvider>
      )}
    </GroupLabel>
  );
};

export default NavbarGroupHeader;
