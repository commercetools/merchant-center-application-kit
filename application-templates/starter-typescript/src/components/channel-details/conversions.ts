import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import type { TFetchChannelDetailsQuery } from '../../types/generated/ctp';
import type { TFormValues } from '../../types';

export const docToFormValues = (
  channel: TFetchChannelDetailsQuery['channel'],
  languages: string[]
): TFormValues => ({
  key: channel?.key ?? '',
  roles: channel?.roles ?? [],
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.nameAllLocales ?? []) ??
      {}
  ),
});

export const formValuesToDoc = (formValues: TFormValues) => ({
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
  key: formValues.key,
  roles: formValues.roles,
});
