import type { ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { Title as DialogTitle } from '@radix-ui/react-dialog';
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

const HiddenEmptyDialogTitle = () => (
  <div aria-hidden={true} style={{ display: 'none' }}>
    <DialogTitle />
  </div>
);

type TitleProps = Pick<Props, 'title'>;
const Title = (props: TitleProps) => {
  return (
    <>
      {typeof props.title === 'string' ? (
        <TextTitle title={props.title} />
      ) : (
        props.title
      )}
      {/* FIXME: Temporary workaround for https://github.com/radix-ui/primitives/issues/2986
        Radix UI's DialogContent requires rendering a DialogTitle, which renders as <h2>.
        To meet this requirement and avoid rendering two heading elements with the title in the DOM (<TextTitle> renders as <h3>), we are hiding the DialogTitle.
      */}
      <HiddenEmptyDialogTitle />
    </>
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
          size="30"
        />
      )}
    </Spacings.Inline>
  </div>
);

DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
