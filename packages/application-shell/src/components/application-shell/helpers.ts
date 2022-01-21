import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';

/**
 * Get the "real" Merchant Center frontend URL to redirect the user
 * to the login page.
 * We use an explicit full URL so that if a user tries to access the
 * Custom Applications directly to its domain, it will always redirect
 * the user to the login page.
 *
 * To determine the "real" URL, we need to check if the current location
 * is a Merchant Center domain, or if it's a custom user domain.
 * For the latter, we can derive the URL from the Merchant Center API URL.
 *
 * A Merchant Center hostname is composed by the following parts:
 *    https://<mc-prefix>.<region>.<provider>.<ct-domain>.<tld>
 * We neeed to check if at least the first 4 parts (right-to-left) are
 * the same.
 */
export function getMcOrigin(mcApiUrl: string, actualWindow = window) {
  const mcApiUrlObject = new URL(mcApiUrl);

  const [tldMcApi, ctDomainMcApi, providerMcApi, regionMcApi] =
    mcApiUrlObject.hostname.split('.').reverse();
  const [tldMc, ctDomainMc, providerMc, regionMc] =
    actualWindow.location.hostname.split('.').reverse();

  const isMatching =
    tldMcApi === tldMc &&
    ctDomainMcApi === ctDomainMc &&
    providerMcApi === providerMc &&
    regionMcApi === regionMc;

  if (isMatching) {
    return actualWindow.location.origin;
  }

  return mcApiUrlObject.origin.replace('mc-api', 'mc');
}

const defaultAsyncMessagesLoader =
  (availableLanguages: string[]) => (lang: string) => {
    const isAvailableLanguage = availableLanguages?.includes(lang);

    return import(
      `../../i18n/data/${
        isAvailableLanguage ? lang : 'core'
      }.json` /* webpackChunkName: "app-i18n-[request]" */
    )
      .then((i18nModule) => i18nModule.default)
      .catch((error) => {
        console.warn(
          `Something went wrong while loading the app messages for ${lang}`,
          error
        );

        return {};
      });
  };

/**
 * Based on the provided object/loader from the Custom Application and the locales configuration,
 * this function decides which is the most suitable handler to resolve translations, providing
 * a default loader by default so the Custom Application would not have to implement it (just set the locales configuration).
 *
 * @param customAppProvidedMessages translations object/loader provided from the Custom Application
 * @param availableLocales locales configured in the Custom Application config file
 * @returns Custom Application provided object/loader, a default loader or raise an error if no enough info is available
 */
export function resolveApplicationMessages(
  customAppProvidedMessages?: TAsyncLocaleDataProps['applicationMessages'],
  availableLocales?: string[]
) {
  if (customAppProvidedMessages) {
    return customAppProvidedMessages;
  }

  if (availableLocales && availableLocales.length > 0) {
    return defaultAsyncMessagesLoader(availableLocales);
  }

  throw new Error(
    `
    Invalid i18n configuration: no messages provided to the ApplicationShell component nor 'availableLocales' configured in the 'custom-application-config' file.
    You can get more information about how to configure i18 over here: https://docs.commercetools.com/custom-applications/development/translations
    `
  );
}
