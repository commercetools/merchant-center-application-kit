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

type TChangeNameActionPayload = Record<'name', LocalizedField>;
type SyncAction = { action: string; [x: string]: unknown };
type GraphqlUpdateAction = Record<string, Record<string, unknown>>;

const getNameFromPayload = (payload: TChangeNameActionPayload) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const isChangeNameActionPayload = (
  actionPayload: Record<string, unknown>
): actionPayload is TChangeNameActionPayload => {
  return Boolean((actionPayload as TChangeNameActionPayload)?.name);
};

const convertAction = (action: SyncAction): GraphqlUpdateAction => {
  const { action: actionName, ...actionPayload } = action;
  return {
    [actionName]:
      actionName === 'changeName' && isChangeNameActionPayload(actionPayload)
        ? getNameFromPayload(actionPayload as TChangeNameActionPayload)
        : actionPayload,
  };
};

export const createGraphQlUpdateActions = (actions: SyncAction[]) =>
  actions.reduce<GraphqlUpdateAction[]>(
    (previousActions, syncAction) => [
      ...previousActions,
      convertAction(syncAction),
    ],
    []
  );

export const convertToActionData = (draft: TChannel) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
});
