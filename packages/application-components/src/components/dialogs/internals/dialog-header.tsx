import type { ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { Title as DialogTitle } from '@radix-ui/react-dialog';
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { useWarning } from '@commercetools-uikit/utils';

type Props = {
  title: ReactNode;
  'aria-label'?: string;
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

type TitleProps = Pick<Props, 'title' | 'aria-label'>;
const Title = (props: TitleProps) => {
  if (typeof props.title === 'string') {
    return (
      /* 
      FIXME: This is a temporary workaround for the issue detailed in https://github.com/radix-ui/primitives/issues/2986#issuecomment-2455201034
      The intended JSX structure should be:
      ```
      <DialogTitle asChild>
        <TextTitle title={props.title} />
      </DialogTitle>
      ```
       */
      <>
        <TextTitle title={props.title} />
        <VisuallyHidden
          css={css`
            display: none;
          `}
        >
          <DialogTitle>{props.title}</DialogTitle>
        </VisuallyHidden>
      </>
    );
  }
  return (
    <>
      {props.title}
      <VisuallyHidden>
        <DialogTitle>{props['aria-label']}</DialogTitle>
      </VisuallyHidden>
    </>
  );
};

const DialogHeader = (props: Props) => {
  useWarning(
    typeof props.title === 'string' ||
      (typeof props.title !== 'string' && Boolean(props['aria-label'])),
    'app-kit/DialogHeader: "aria-label" prop is required when the "title" prop is not a string.'
  );
  return (
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
        <Title title={props.title} aria-label={props['aria-label']} />
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
};
DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
