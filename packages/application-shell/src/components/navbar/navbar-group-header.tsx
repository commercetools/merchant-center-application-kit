import styled from '@emotion/styled';
import { Badge } from '@commercetools/nimbus';
import { useIntl } from 'react-intl';
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

const NavbarGroupHeader = ({ label, isNew }: NavbarGroupHeaderProps) => {
  const intl = useIntl();

  return (
    <GroupLabel>
      <Spacings.Inline scale="s" alignItems="center">
        <span>{label}</span>
        {isNew && (
          <Badge colorPalette="primary" size="2xs">
            {intl.formatMessage(messages['NavBar.Group.badge.new'])}
          </Badge>
        )}
      </Spacings.Inline>
    </GroupLabel>
  );
};

export default NavbarGroupHeader;
