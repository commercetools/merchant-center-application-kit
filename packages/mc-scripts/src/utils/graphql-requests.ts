import chalk from 'chalk';
import { type DocumentNode, print } from 'graphql';
import { ClientError, GraphQLClient, type Variables } from 'graphql-request';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TFetchMyOrganizationsFromCliQuery,
  TFetchMyOrganizationsFromCliQueryVariables,
} from '../generated/core';
import type {
  TCreateCustomApplicationDeploymentPreviewMutation,
  TCreateCustomApplicationDeploymentPreviewMutationVariables,
  TCreateCustomApplicationFromCliMutation,
  TCreateCustomApplicationFromCliMutationVariables,
  TCreateCustomViewFromCliMutation,
  TCreateCustomViewFromCliMutationVariables,
  TCustomApplicationDeploymentPreviewCreateInput,
  TCustomApplicationDeploymentPreviewUpdateInput,
  TCustomApplicationDraftDataInput,
  TCustomViewDraftDataInput,
  TDeleteCustomApplicationDeploymentPreviewMutation,
  TDeleteCustomApplicationDeploymentPreviewMutationVariables,
  TFetchCustomApplicationFromCliQuery,
  TFetchCustomApplicationFromCliQueryVariables,
  TFetchCustomViewFromCliQuery,
  TFetchCustomViewFromCliQueryVariables,
  TUpdateCustomApplicationDeploymentPreviewMutation,
  TUpdateCustomApplicationDeploymentPreviewMutationVariables,
  TUpdateCustomApplicationFromCliMutation,
  TUpdateCustomApplicationFromCliMutationVariables,
  TUpdateCustomViewFromCliMutation,
  TUpdateCustomViewFromCliMutationVariables,
} from '../generated/settings';
import CreateCustomApplicationDeploymentPreviewFromCli from './create-custom-application-deployment-preview.settings.graphql';
import CreateCustomApplicationFromCli from './create-custom-application.settings.graphql';
import CreateCustomViewFromCli from './create-custom-view.settings.graphql';
import CredentialsStorage from './credentials-storage';
import DeleteCustomApplicationDeploymentPreviewFromCli from './delete-custom-application-deployment-preview.settings.graphql';
import FetchCustomApplicationFromCli from './fetch-custom-application.settings.graphql';
import FetchCustomViewFromCli from './fetch-custom-view.settings.graphql';
import FetchMyOrganizationsFromCli from './fetch-user-organizations.core.graphql';
import UpdateCustomApplicationDeploymentPreviewFromCli from './update-custom-application-deployment-preview.settings.graphql';
import UpdateCustomApplicationFromCli from './update-custom-application.settings.graphql';
import UpdateCustomViewFromCli from './update-custom-view.settings.graphql';
import userAgent from './user-agent';

type TFetchCustomApplicationOptions = {
  mcApiUrl: string;
  entryPointUriPath: string;
  applicationIdentifier: string;
};
type TFetchCustomViewOptions = {
  mcApiUrl: string;
  customViewId: string;
  applicationIdentifier: string;
};
type TUpdateCustomApplicationOptions = {
  mcApiUrl: string;
  applicationId: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
  applicationIdentifier: string;
};
type TUpdateCustomViewOptions = {
  mcApiUrl: string;
  customViewId: string;
  organizationId: string;
  data: TCustomViewDraftDataInput;
  applicationIdentifier: string;
};
type TCreateCustomApplicationOptions = {
  mcApiUrl: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
  applicationIdentifier: string;
};
type TCreateCustomViewOptions = {
  mcApiUrl: string;
  organizationId: string;
  data: TCustomViewDraftDataInput;
  applicationIdentifier: string;
};
type TFetchUserOrganizationsOptions = {
  mcApiUrl: string;
  applicationIdentifier: string;
  customViewId?: string;
};
type TCreateCustomApplicationDeploymentPreviewOptions = {
  mcApiUrl: string;
  organizationId: string;
  applicationId: string;
  applicationIdentifier: string;
  data: TCustomApplicationDeploymentPreviewCreateInput;
};
type TUpdateCustomApplicationDeploymentPreviewOptions = {
  mcApiUrl: string;
  deploymentId: string;
  organizationId: string;
  data: TCustomApplicationDeploymentPreviewUpdateInput;
  applicationIdentifier: string;
};
type TDeleteCustomApplicationDeploymentPreviewOptions = {
  mcApiUrl: string;
  organizationId: string;
  applicationIdentifier: string;
  deploymentId: string;
};

const credentialsStorage = new CredentialsStorage();

async function requestWithTokenRetry<Data, QueryVariables extends Variables>(
  document: DocumentNode,
  requestOptions: {
    variables?: QueryVariables;
    mcApiUrl: string;
    headers: HeadersInit;
  },
  retryCount: number = 0
): Promise<Data> {
  const token = credentialsStorage.getToken(requestOptions.mcApiUrl);

  const client = new GraphQLClient(`${requestOptions.mcApiUrl}/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-user-agent': userAgent,
      ...(token ? { 'x-mc-cli-access-token': token } : {}),
      ...requestOptions.headers,
    },
  });

  try {
    const result = await client.rawRequest<Data, QueryVariables>(
      print(document),
      requestOptions.variables
    );

    // In case a new session token is returned from the server, save it.
    const refreshedSessionToken = result.headers.get(
      'x-refreshed-session-token'
    );
    if (refreshedSessionToken) {
      console.log(chalk.green('Session token refreshed.'));
      console.log();
      const refreshedSessionTokenExpiresAt = result.headers.get(
        'x-refreshed-session-token-expires-at'
      );
      // Store the updated access token.
      credentialsStorage.setToken(requestOptions.mcApiUrl, {
        token: refreshedSessionToken,
        expiresAt: Number(refreshedSessionTokenExpiresAt),
      });
    }

    return result.data;
  } catch (error) {
    if (error instanceof ClientError) {
      // If it's an unauthorized error, retry the request to force the token to be refreshed.
      if (
        retryCount === 0 &&
        error.response.errors &&
        error.response.errors.length > 0
      ) {
        const isUnauthorizedError = error.response.errors.some(
          (graphqlError) => graphqlError.extensions?.code === 'UNAUTHENTICATED'
        );
        if (isUnauthorizedError) {
          console.log(
            chalk.yellow(
              'Expired or invalid session token, attempting to retry the request with a refreshed token...'
            )
          );
          return requestWithTokenRetry(
            document,
            {
              ...requestOptions,
              headers: {
                ...requestOptions.headers,
                'X-Force-Token': 'true',
              },
            },
            retryCount + 1
          );
        }
      }
    }
    throw error;
  }
}

const fetchCustomApplication = async ({
  mcApiUrl,
  entryPointUriPath,
  applicationIdentifier,
}: TFetchCustomApplicationOptions) => {
  const customAppData = await requestWithTokenRetry<
    TFetchCustomApplicationFromCliQuery,
    TFetchCustomApplicationFromCliQueryVariables
  >(FetchCustomApplicationFromCli, {
    variables: { entryPointUriPath },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return customAppData.organizationExtensionForCustomApplication;
};

const fetchCustomView = async ({
  mcApiUrl,
  customViewId,
  applicationIdentifier,
}: TFetchCustomViewOptions) => {
  const customViewData = await requestWithTokenRetry<
    TFetchCustomViewFromCliQuery,
    TFetchCustomViewFromCliQueryVariables
  >(FetchCustomViewFromCli, {
    variables: { customViewId },
    mcApiUrl,
    headers: {
      'x-custom-view-id': customViewId,
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return customViewData.organizationExtensionForCustomView;
};

const updateCustomApplication = async ({
  mcApiUrl,
  applicationId,
  organizationId,
  data,
  applicationIdentifier,
}: TUpdateCustomApplicationOptions) => {
  const updatedCustomAppsData = await requestWithTokenRetry<
    TUpdateCustomApplicationFromCliMutation,
    TUpdateCustomApplicationFromCliMutationVariables
  >(UpdateCustomApplicationFromCli, {
    variables: {
      organizationId,
      applicationId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return updatedCustomAppsData.updateCustomApplication;
};

const updateCustomView = async ({
  mcApiUrl,
  organizationId,
  data,
  customViewId,
  applicationIdentifier,
}: TUpdateCustomViewOptions) => {
  const updatedCustomViewData = await requestWithTokenRetry<
    TUpdateCustomViewFromCliMutation,
    TUpdateCustomViewFromCliMutationVariables
  >(UpdateCustomViewFromCli, {
    variables: {
      organizationId,
      customViewId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-custom-view-id': customViewId,
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return updatedCustomViewData.updateCustomView;
};

const createCustomApplication = async ({
  mcApiUrl,
  organizationId,
  data,
  applicationIdentifier,
}: TCreateCustomApplicationOptions) => {
  const createdCustomAppData = await requestWithTokenRetry<
    TCreateCustomApplicationFromCliMutation,
    TCreateCustomApplicationFromCliMutationVariables
  >(CreateCustomApplicationFromCli, {
    variables: {
      organizationId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return createdCustomAppData.createCustomApplication;
};

const createCustomView = async ({
  mcApiUrl,
  organizationId,
  data,
  applicationIdentifier,
}: TCreateCustomViewOptions) => {
  const createdCustomViewData = await requestWithTokenRetry<
    TCreateCustomViewFromCliMutation,
    TCreateCustomViewFromCliMutationVariables
  >(CreateCustomViewFromCli, {
    variables: {
      organizationId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return createdCustomViewData.createCustomView;
};

const fetchUserOrganizations = async ({
  mcApiUrl,
  applicationIdentifier,
  customViewId,
}: TFetchUserOrganizationsOptions) => {
  const userOrganizations = await requestWithTokenRetry<
    TFetchMyOrganizationsFromCliQuery,
    TFetchMyOrganizationsFromCliQueryVariables
  >(FetchMyOrganizationsFromCli, {
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      ...(customViewId && {
        'x-custom-view-id': customViewId,
      }),
      'x-graphql-target': GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
    },
  });
  return userOrganizations.myOrganizations;
};

const createCustomApplicationDeploymentPreview = async ({
  mcApiUrl,
  organizationId,
  applicationId,
  applicationIdentifier,
  data,
}: TCreateCustomApplicationDeploymentPreviewOptions) => {
  const createdDeploymentPreviewResult = await requestWithTokenRetry<
    TCreateCustomApplicationDeploymentPreviewMutation,
    TCreateCustomApplicationDeploymentPreviewMutationVariables
  >(CreateCustomApplicationDeploymentPreviewFromCli, {
    variables: {
      organizationId,
      applicationId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return createdDeploymentPreviewResult.createCustomApplicationDeploymentPreview;
};

const updateCustomApplicationDeploymentPreview = async ({
  mcApiUrl,
  organizationId,
  deploymentId,
  data,
  applicationIdentifier,
}: TUpdateCustomApplicationDeploymentPreviewOptions) => {
  const updatedDeploymentPreviewResult = await requestWithTokenRetry<
    TUpdateCustomApplicationDeploymentPreviewMutation,
    TUpdateCustomApplicationDeploymentPreviewMutationVariables
  >(UpdateCustomApplicationDeploymentPreviewFromCli, {
    variables: {
      organizationId,
      deploymentId,
      data,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return updatedDeploymentPreviewResult.updateCustomApplicationDeploymentPreview;
};

const deleteCustomApplicationDeploymentPreview = async ({
  mcApiUrl,
  organizationId,
  applicationIdentifier,
  deploymentId,
}: TDeleteCustomApplicationDeploymentPreviewOptions) => {
  await requestWithTokenRetry<
    TDeleteCustomApplicationDeploymentPreviewMutation,
    TDeleteCustomApplicationDeploymentPreviewMutationVariables
  >(DeleteCustomApplicationDeploymentPreviewFromCli, {
    variables: {
      organizationId,
      deploymentId,
    },
    mcApiUrl,
    headers: {
      'x-application-id': applicationIdentifier,
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
};

export {
  fetchCustomApplication,
  fetchCustomView,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
  createCustomView,
  updateCustomView,
  createCustomApplicationDeploymentPreview,
  updateCustomApplicationDeploymentPreview,
  deleteCustomApplicationDeploymentPreview,
};
