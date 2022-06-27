import type { SingleValueProps, ValueContainerProps } from 'react-select';
import { useCallback } from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import SelectInput from '@commercetools-uikit/select-input';
import { WorldIcon } from '@commercetools-uikit/icons';
import { customProperties } from '@commercetools-uikit/design-system';
import messages from './messages';

type CustomSingleValueProps = SingleValueProps & {
  localeCount: number;
};
type Props = {
  projectDataLocale: string;
  setProjectDataLocale: (locale: string) => void;
  availableLocales: string[];
};

const LOCALE_SWITCHER_LABEL_ID = 'locale-switcher-label';

export const SingleValue = (props: CustomSingleValueProps) => (
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
        color: ${customProperties.colorAccent};
      `}
    >
      {props.children}
    </span>
    <span
      css={css`
        width: 22px;
        height: 22px;
        border-radius: 100%;
        background: ${customProperties.colorAccent40};
        color: ${customProperties.colorSurface};
        font-size: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {props.localeCount}
    </span>
  </div>
);
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
        width: ${customProperties.constraint3};
      `}
      data-track-component="LocaleSwitch"
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
            <SingleValue
              {...valueProps}
              localeCount={props.availableLocales.length}
            />
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
