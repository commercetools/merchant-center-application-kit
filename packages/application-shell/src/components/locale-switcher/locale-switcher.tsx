import { useCallback } from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import type { SingleValueProps, ValueContainerProps } from 'react-select';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import { WorldIcon } from '@commercetools-uikit/icons';
import SelectInput from '@commercetools-uikit/select-input';
import messages from './messages';

type Props = {
  projectDataLocale: string;
  setProjectDataLocale: (locale: string) => void;
  availableLocales: string[];
};

const LOCALE_SWITCHER_LABEL_ID = 'locale-switcher-label';

export const SingleValue = (props: SingleValueProps) => {
  return (
    <div
      css={css`
        flex: 1;
        align-items: center;
        display: flex;
      `}
    >
      <WorldIcon size="big" />
      <span
        css={css`
          margin-left: 2px;
          flex: 1;
          color: ${designTokens.colorAccent};
        `}
      >
        {props.children}
      </span>
    </div>
  );
};
SingleValue.displayName = 'SingleValue';

const PatchedValueContainer = (props: ValueContainerProps) => (
  <SelectInput.ValueContainer
    {...props}
    innerProps={{ style: { display: 'flex' } }}
  />
);
PatchedValueContainer.displayName = 'PatchedValueContainer';

const LocaleSwitcher = (props: Props) => {
  const { setProjectDataLocale } = props;
  const handleSelection = useCallback(
    (event) => {
      setProjectDataLocale(event.target.value);
    },
    [setProjectDataLocale]
  );
  return (
    <div
      css={css`
        position: relative;
        width: ${designTokens.constraint4};
      `}
    >
      <AccessibleHidden>
        <span id={LOCALE_SWITCHER_LABEL_ID}>
          <FormattedMessage {...messages.localesLabel} />
        </span>
      </AccessibleHidden>
      <SelectInput
        value={props.projectDataLocale}
        name="locale-switcher"
        aria-labelledby={LOCALE_SWITCHER_LABEL_ID}
        onChange={handleSelection}
        options={props.availableLocales.map((locale) => ({
          label: locale,
          value: locale,
        }))}
        components={{
          SingleValue: (valueProps: SingleValueProps) => (
            <SingleValue {...valueProps} />
          ),
          ValueContainer: PatchedValueContainer,
        }}
        isClearable={false}
        backspaceRemovesValue={false}
        isSearchable={false}
      />
    </div>
  );
};

export default LocaleSwitcher;
