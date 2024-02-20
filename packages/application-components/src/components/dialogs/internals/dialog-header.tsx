import type { ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

type Props = {
  title: ReactNode;
  onClose?: (event: SyntheticEvent) => void;
  children?: never;
};

type TTextTitleProps = {
  title: string;
};
export const TextTitle = (props: TTextTitleProps) => (
  <Text.Headline as="h3" title={props.title} truncate>
    {props.title}
  </Text.Headline>
);

type TitleProps = Pick<Props, 'title'>;
const Title = (props: TitleProps) => {
  if (typeof props.title === 'string') {
    return <TextTitle title={props.title} />;
  } else {
    return <>{props.title}</>;
  }
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
