import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';
import type { ApolloError, ServerError } from '@apollo/client';

export const getErrorMessage = (error: ApolloError) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

const isApolloError = (error: unknown): error is ApolloError => {
  return (error as ApolloError).graphQLErrors !== undefined;
};

const isServerError = (
  error: ApolloError['networkError']
): error is ServerError => {
  return (error as ServerError).result !== undefined;
};

export const extractErrorFromGraphQlResponse = (graphQlResponse: unknown) => {
  if (isApolloError(graphQlResponse)) {
    if (
      isServerError(graphQlResponse.networkError) &&
      graphQlResponse.networkError.result?.errors?.length > 0
    ) {
      return graphQlResponse.networkError.result.errors;
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

const hasActionPaloadNameProperty = (
  actionPayload: Record<string, unknown>
): actionPayload is TActionPayloadWithNameProperty => {
  return (actionPayload as TActionPayloadWithNameProperty).name !== undefined;
};

type Action = { action: string; [x: string]: unknown };

const convertAction = (
  actionName: Action['action'],
  actionPayload: Record<string, unknown>
) => ({
  [actionName]:
    actionName === 'changeName' && hasActionPaloadNameProperty(actionPayload)
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
