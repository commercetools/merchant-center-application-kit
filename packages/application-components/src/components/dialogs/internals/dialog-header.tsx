import type { SyntheticEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

type Props = {
  title?: string | ReactNode;
  onClose?: (event: SyntheticEvent) => void;
  children?: never;
};

type TitleProps = Pick<Props, 'title'>;
const Title = (props: TitleProps) => {
  return (
    <Text.Headline as="h3" title={props.title} truncate>
      {props.title}
    </Text.Headline>
  );
};

const DialogHeader = (props: Props) => (
  <div
    css={css`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      margin-bottom: ${uiKitDesignTokens.spacing30};
    `}
  >
    <Spacings.Inline
      scale="m"
      alignItems="center"
      justifyContent="space-between"
    >
      <Title title={props.title} />
      {props.onClose && (
        <SecondaryIconButton
          label="Close dialog"
          onClick={props.onClose}
          icon={<CloseIcon />}
          size="medium"
        />
      )}
    </Spacings.Inline>
  </div>
);
DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
