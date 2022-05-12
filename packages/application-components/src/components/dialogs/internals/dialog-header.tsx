import type { SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';

type Props = {
  title: string;
  onClose?: (event: SyntheticEvent) => void;
  children?: never;
};

const DialogHeader = (props: Props) => (
  <div
    css={css`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
    `}
  >
    <Spacings.Inline
      scale="m"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text.Subheadline as="h4" truncate={true} title={props.title}>
        {props.title}
      </Text.Subheadline>
      {props.onClose && (
        <SecondaryIconButton
          label="Close dialog"
          onClick={props.onClose}
          icon={<CloseIcon size="medium" />}
        />
      )}
    </Spacings.Inline>
  </div>
);
DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
