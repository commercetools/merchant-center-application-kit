import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import type {
  SingleValueProps,
  ValueContainerProps,
  MenuListProps,
  GroupHeadingProps,
} from 'react-select';
import { components } from 'react-select';
import { InfoDialog } from '@commercetools-frontend/application-components';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import IconButton from '@commercetools-uikit/icon-button';
import { WorldIcon, InformationIcon } from '@commercetools-uikit/icons';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';

type Props = {
  projectDataLocale: string;
  setProjectDataLocale: (locale: string) => void;
  availableLocales: string[];
};

const LOCALE_SWITCHER_LABEL_ID = 'locale-switcher-label';

export const SingleValue = (props: SingleValueProps) => {
  return (
    <Spacings.Inline scale="xs" alignItems="center">
      <WorldIcon size="big" />
      <Text.Body fontWeight="medium">{props.children}</Text.Body>
    </Spacings.Inline>
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

const CustomGroupHeading = (
  props: GroupHeadingProps & { setIsOpen: (value: boolean) => void }
) => {
  const { setIsOpen, ...groupProps } = props;
  return (
    <>
      <components.GroupHeading {...groupProps}>
        <Spacings.Inline scale="xs" alignItems="center">
          <span>{groupProps.children}</span>
          <IconButton
            icon={<InformationIcon />}
            label="Locales info"
            size="small"
            onClick={() => setIsOpen(true)}
          />
        </Spacings.Inline>
      </components.GroupHeading>
    </>
  );
};
CustomGroupHeading.displayName = 'CustomGroupHeading';

const LocaleSwitcher = (props: Props) => {
  const { setProjectDataLocale } = props;
  const [isDescriptionDialogOpened, setIsDescriptionDialogOpened] =
    useState(false);

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
            <CustomGroupHeading
              {...groupProps}
              setIsOpen={setIsDescriptionDialogOpened}
            />
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
        isOpen={isDescriptionDialogOpened}
        title="Lorem ipsum"
        onClose={() => setIsDescriptionDialogOpened(false)}
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
