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
  font-size: ${uiKitDesignTokens.fontSize10};
  font-weight: ${uiKitDesignTokens.fontWeight600};
  line-height: ${uiKitDesignTokens.lineHeight30};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${uiKitDesignTokens.colorSurface};
  padding: ${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing40} 0;
`;

const NavbarGroupHeader = ({ label, isNew }: NavbarGroupHeaderProps) => {
  const intl = useIntl();

  return (
    <GroupLabel>
      <Spacings.Inline scale="m" alignItems="center">
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
