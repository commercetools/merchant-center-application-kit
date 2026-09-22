import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import messages from './messages';

type NavbarGroupHeaderProps = {
  label: string;
  isNew?: boolean;
};

const GroupLabel = styled.div`
  font-size: ${uiKitDesignTokens.fontSize20};
  font-weight: ${uiKitDesignTokens.fontWeight700};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${uiKitDesignTokens.colorNeutral60};
  padding: ${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing40} 0;
`;

const NewBadge = styled.span`
  display: inline-block;
  background-color: ${uiKitDesignTokens.colorNeutral60};
  color: ${uiKitDesignTokens.colorSurface};
  padding: ${uiKitDesignTokens.spacing10} ${uiKitDesignTokens.spacing20};
  border-radius: ${uiKitDesignTokens.borderRadius4};
  font-size: ${uiKitDesignTokens.fontSize10};
  font-weight: ${uiKitDesignTokens.fontWeight700};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NavbarGroupHeader = ({ label, isNew }: NavbarGroupHeaderProps) => {
  return (
    <GroupLabel>
      <Spacings.Inline scale="s" alignItems="center">
        <span>{label}</span>
        {isNew && (
          <NewBadge>
            <FormattedMessage {...messages['NavBar.Group.badge.new']} />
          </NewBadge>
        )}
      </Spacings.Inline>
    </GroupLabel>
  );
};

export default NavbarGroupHeader;
