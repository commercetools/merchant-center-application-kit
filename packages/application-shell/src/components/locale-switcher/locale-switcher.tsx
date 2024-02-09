import { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import type {
  SingleValueProps,
  ValueContainerProps,
  MenuListProps,
} from 'react-select';
import GroupHeadingPropsDefinedProps from 'react-select';
import { components } from 'react-select';
import { InfoDialog } from '@commercetools-frontend/application-components';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import IconButton from '@commercetools-uikit/icon-button';
import { WorldIcon, InformationIcon } from '@commercetools-uikit/icons';
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
    innerProps={{
      style: { display: 'flex', fontWeight: designTokens.fontWeight500 },
    }}
  />
);
PatchedValueContainer.displayName = 'PatchedValueContainer';

const CustomMenuList = (props: MenuListProps) => {
  return <components.MenuList {...props}>{props.children}</components.MenuList>;
};

export const CustomGroupHeading = (
  props: GroupHeadingPropsDefinedProps & { setIsOpen: (value: boolean) => void }
) => {
  const { setIsOpen, ...groupProps } = props;
  return (
    <>
      <components.GroupHeading
        {...groupProps}
        css={css`
          display: flex;
          gap: ${designTokens.spacing10};
        `}
      >
        {groupProps.children}
        <IconButton
          icon={<InformationIcon />}
          label="Locales info"
          size="small"
          onClick={() => setIsOpen(true)}
        />
      </components.GroupHeading>
    </>
  );
};
CustomGroupHeading.displayName = 'CustomGroupHeading';

const LocaleSwitcher = (props: Props) => {
  const { setProjectDataLocale } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = useCallback(
    (event) => {
      setProjectDataLocale(event.target.value);
    },
    [setProjectDataLocale]
  );

  const localeOptions = [
    {
      label: 'Locales',
      options: props.availableLocales.map((locale) => ({
        label: locale,
        value: locale,
      })),
    },
  ];

  return (
    <div>
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
        options={localeOptions}
        components={{
          SingleValue,
          ValueContainer: PatchedValueContainer,
          MenuList: CustomMenuList,
          GroupHeading: (groupProps) => (
            <CustomGroupHeading {...groupProps} setIsOpen={setIsOpen} />
          ),
        }}
        isClearable={false}
        backspaceRemovesValue={false}
        isSearchable={false}
        horizontalConstraint={'auto'}
        appearance="quiet"
        maxMenuHeight={360}
        minMenuWidth={3}
      />
      {/* Dialog that explains the locales */}
      <InfoDialog
        isOpen={isOpen}
        title="Lorem ipsum"
        onClose={() => setIsOpen(false)}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis vero
        quas soluta nesciunt, incidunt repellat cumque autem id exercitationem
        amet. Illum quaerat labore accusantium perferendis ab laboriosam. Saepe,
        repudiandae adipisci.
      </InfoDialog>
    </div>
  );
};

export default LocaleSwitcher;
