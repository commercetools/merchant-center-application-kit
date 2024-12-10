import type { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import FlatButton from '@commercetools-uikit/flat-button';
import { ListIcon } from '@commercetools-uikit/icons';
import messages from './messages';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
  values?: Record<string, ReactNode>;
};
type Label = string | MessageDescriptor;
type Props = {
  color?: 'surface' | 'neutral';
  previousPathLabel?: Label;
  onClick: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  children?: never;
};

const PageTopBar = ({
  color = 'surface',
  previousPathLabel = messages.back,
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
        margin-bottom: ${uiKitDesignTokens.spacing40};
        background-color: ${uiKitDesignTokens.colorSurface};
      `}
    >
      <FlatButton
        tone="primary"
        label={
          typeof previousPathLabel === 'string'
            ? previousPathLabel
            : intl.formatMessage(previousPathLabel)
        }
        icon={<ListIcon size="medium" color="primary" />}
        onClick={props.onClick}
      />
    </div>
  );
};
PageTopBar.displayName = 'PageTopBar';

export default PageTopBar;
