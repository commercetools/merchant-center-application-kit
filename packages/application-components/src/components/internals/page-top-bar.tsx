import type { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { ListIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import { designTokens } from '@commercetools-uikit/design-system';
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
  color: 'surface' | 'neutral';
  previousPathLabel: Label;
  onClick: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  children?: never;
};

const defaultProps: Pick<Props, 'color' | 'previousPathLabel'> = {
  color: 'surface',
  previousPathLabel: messages.back,
};

const PageTopBar = (props: Props) => {
  const intl = useIntl();

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${props.color === 'neutral'
          ? designTokens.colorNeutral95
          : designTokens.colorSurface};
      `}
    >
      <FlatButton
        tone="primary"
        label={
          typeof props.previousPathLabel === 'string'
            ? props.previousPathLabel
            : intl.formatMessage(props.previousPathLabel)
        }
        icon={<ListIcon size="medium" color="primary" />}
        onClick={props.onClick}
      />
    </div>
  );
};
PageTopBar.displayName = 'PageTopBar';
PageTopBar.defaultProps = defaultProps;

export default PageTopBar;
