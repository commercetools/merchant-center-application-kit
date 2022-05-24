import {
  transformLocalizedStringToLocalizedField,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import { ApolloError, type ServerError } from '@apollo/client';
import type { TChannel } from '../types/generated/ctp';

export const getErrorMessage = (error: ApolloError) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

const isServerError = (
  error: ApolloError['networkError']
): error is ServerError => {
  return Boolean((error as ServerError)?.result);
};

export const extractErrorFromGraphQlResponse = (graphQlResponse: unknown) => {
  if (graphQlResponse instanceof ApolloError) {
    if (
      isServerError(graphQlResponse.networkError) &&
      graphQlResponse.networkError?.result?.errors.length > 0
    ) {
      return graphQlResponse?.networkError?.result.errors;
    }

    if (graphQlResponse.graphQLErrors?.length > 0) {
      return graphQlResponse.graphQLErrors;
    }
  }

  return graphQlResponse;
};

type LocalizedField = {
  locale: string;
  value: string;
};

type TActionPayloadWithNameProperty = Record<'name', LocalizedField>;

const getNameFromPayload = (payload: TActionPayloadWithNameProperty) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const hasActionPayloadNameProperty = (
  actionPayload: Record<string, unknown>
): actionPayload is TActionPayloadWithNameProperty => {
  return Boolean((actionPayload as TActionPayloadWithNameProperty)?.name);
};

type Action = { action: string; [x: string]: unknown };

const convertAction = (
  actionName: Action['action'],
  actionPayload: Record<string, unknown>
) => ({
  [actionName]:
    actionName === 'changeName' && hasActionPayloadNameProperty(actionPayload)
      ? getNameFromPayload(actionPayload)
      : actionPayload,
});

type ConvertedAction = Record<Action['action'], Record<string, unknown>>;
export const createGraphQlUpdateActions = (actions: Action[]) =>
  actions.reduce<ConvertedAction[]>(
    (previousActions, { action: actionName, ...actionPayload }) => [
      ...previousActions,
      convertAction(actionName, actionPayload),
    ],
    []
  );

export const convertToActionData = (draft: TChannel) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
});
