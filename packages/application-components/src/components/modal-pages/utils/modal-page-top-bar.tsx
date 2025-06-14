/*
  This file lives within the "utils" directory instead of the "internals" one because
  it is shared not only among the components of the "modal-pages" folder, but also
  it is exported from this package so it can be used from external code as well.
*/
import { cloneElement, type SyntheticEvent, type ReactElement } from 'react';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import FlatButton from '@commercetools-uikit/flat-button';
import { CloseIcon, AngleLeftIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton, {
  type TSecondaryButtonIconProps,
} from '@commercetools-uikit/secondary-icon-button';
import Text from '@commercetools-uikit/text';
import messages from '../../internals/messages';

type TLargeIconWrapperProps = {
  children: ReactElement<TLargeIconWrapperProps>;
  size?: TSecondaryButtonIconProps['size'];
};

// Component to have a larger clickable surface
export const LargeIconWrapper = (props: TLargeIconWrapperProps) => (
  <span
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        position: absolute;
        height: 35px;
        width: 48px;
        top: 0;
        right: 0;
      }
    `}
  >
    {cloneElement(props.children, {
      size: props.size,
    })}
  </span>
);

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
type Props = {
  color?: 'surface' | 'neutral';
  currentPathLabel?: string;
  previousPathLabel?: Label;
  hidePathLabel?: boolean;
  onClose: (event: SyntheticEvent) => void;
  children?: never;
};

const ModalPageTopBar = ({
  color = 'surface',
  previousPathLabel = messages.back,
  hidePathLabel = false,
  ...props
}: Props) => {
  const intl = useIntl();
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${uiKitDesignTokens.spacing40} ${uiKitDesignTokens.spacing55} 0;
        background-color: ${uiKitDesignTokens.colorSurface};
        border-bottom: 1px solid ${uiKitDesignTokens.colorSurface};
        & * + * {
          margin-left: ${uiKitDesignTokens.spacingS};
        }

        /* FIXME: these "dirty" styles should be removed when the new Breadcrumbs component is implemented */
        p {
          font-size: 12px !important;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          overflow: hidden;

          /*  specific selector for the svg of the FlatButton */
          button:first-of-type svg {
            height: 12px !important;
            width: 12px !important;
          }
        `}
      >
        {!hidePathLabel && (
          <FlatButton
            tone="primary"
            label={
              typeof previousPathLabel === 'string'
                ? previousPathLabel
                : intl.formatMessage(previousPathLabel)
            }
            icon={<AngleLeftIcon size="medium" color="primary" />}
            onClick={props.onClose}
          />
        )}
        {props.currentPathLabel && (
          <>
            <Text.Detail as="span">/</Text.Detail>
            <Text.Detail as="span" title={props.currentPathLabel} truncate>
              {props.currentPathLabel}
            </Text.Detail>
          </>
        )}
      </div>
      {props.onClose && (
        <SecondaryIconButton
          label={intl.formatMessage(messages.close)}
          onClick={props.onClose}
          icon={
            <LargeIconWrapper>
              <CloseIcon />
            </LargeIconWrapper>
          }
          size="40"
        />
      )}
    </div>
  );
};
ModalPageTopBar.displayName = 'ModalPageTopBar';

export default ModalPageTopBar;
