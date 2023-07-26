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
import { designTokens as appKitDesignTokens } from '../../../theming';
import messages from '../../internals/messages';

type TLargeIconWrapperProps = {
  children: ReactElement;
  size?: TSecondaryButtonIconProps['size'];
};

// Component to have a larger clickable surface
const LargeIconWrapper = (props: TLargeIconWrapperProps) => (
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
    {cloneElement(props.children, { size: props.size })}
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
  color: 'surface' | 'neutral';
  currentPathLabel?: string;
  previousPathLabel: Label;
  hidePathLabel?: boolean;
  onClose: (event: SyntheticEvent) => void;
  children?: never;
};
const defaultProps: Pick<
  Props,
  'color' | 'previousPathLabel' | 'hidePathLabel'
> = {
  color: 'surface',
  previousPathLabel: messages.back,
  hidePathLabel: false,
};

const ModalPageTopBar = (props: Props) => {
  const intl = useIntl();
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${appKitDesignTokens.paddingForModalTopBar};
        background-color: ${props.color === 'neutral'
          ? appKitDesignTokens.backgroundColorForPageHeader
          : uiKitDesignTokens.colorSurface};
        border-bottom: 1px solid
          ${props.color === 'neutral'
            ? uiKitDesignTokens.colorSurface
            : appKitDesignTokens.borderColorForModalTopBarWhenSurface};
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
        {!props.hidePathLabel && (
          <FlatButton
            tone="primary"
            label={
              typeof props.previousPathLabel === 'string'
                ? props.previousPathLabel
                : intl.formatMessage(props.previousPathLabel)
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
          size="big"
        />
      )}
    </div>
  );
};
ModalPageTopBar.displayName = 'ModalPageTopBar';
ModalPageTopBar.defaultProps = defaultProps;

export default ModalPageTopBar;
