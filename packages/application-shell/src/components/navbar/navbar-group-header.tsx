import styled from '@emotion/styled';
import { Badge } from '@commercetools/nimbus';
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

const NavbarGroupHeader = ({ label, isNew }: NavbarGroupHeaderProps) => {
  const intl = useIntl();

  return (
    <GroupLabel>
      <span>{label}</span>
      {isNew && (
        <Badge colorPalette="primary" size="2xs">
          {intl.formatMessage(messages['NavBar.Group.badge.new'])}
        </Badge>
      )}
    </GroupLabel>
  );
};

export default NavbarGroupHeader;
