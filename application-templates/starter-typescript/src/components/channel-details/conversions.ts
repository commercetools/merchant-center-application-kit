import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import type { TChannel } from '../../../@types/generated/ctp';
import type { FormValues, ActionData } from './types';

export const docToFormValues = (
  channel: TChannel | undefined,
  languages: string[]
): FormValues => ({
  key: channel?.key ?? '',
  roles: channel?.roles ?? [],
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.nameAllLocales ?? []) ??
      {}
  ),
});

export const formValuesToDoc = (formValues: FormValues): ActionData => ({
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
  key: formValues.key,
  roles: formValues.roles,
});
