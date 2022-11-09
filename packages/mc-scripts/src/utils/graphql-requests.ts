import chalk from 'chalk';
import { type DocumentNode, print } from 'graphql';
import { ClientError, GraphQLClient } from 'graphql-request';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TCreateCustomApplicationFromCliMutation,
  TCreateCustomApplicationFromCliMutationVariables,
  TCustomApplicationDraftDataInput,
  TFetchCustomApplicationFromCliQuery,
  TFetchCustomApplicationFromCliQueryVariables,
  TUpdateCustomApplicationFromCliMutation,
  TUpdateCustomApplicationFromCliMutationVariables,
} from '../generated/settings';
import type {
  TFetchMyOrganizationsFromCliQuery,
  TFetchMyOrganizationsFromCliQueryVariables,
} from '../generated/core';
import userAgent from './user-agent';
import FetchCustomApplicationFromCli from './fetch-custom-application.settings.graphql';
import UpdateCustomApplicationFromCli from './update-custom-application.settings.graphql';
import CreateCustomApplicationFromCli from './create-custom-application.settings.graphql';
import FetchMyOrganizationsFromCli from './fetch-user-organizations.core.graphql';
import CredentialsStorage from './credentials-storage';

type TFetchCustomApplicationOptions = {
  mcApiUrl: string;
  entryPointUriPath: string;
};
type TUpdateCustomApplicationOptions = {
  mcApiUrl: string;
  applicationId: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
};
type TCreateCustomApplicationOptions = {
  mcApiUrl: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
};
type TFetchUserOrganizationsOptions = {
  mcApiUrl: string;
};

const credentialsStorage = new CredentialsStorage();

const client = new GraphQLClient(
  '', // <-- Set on demand
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-user-agent': userAgent,
    },
  }
);

async function requestWithTokenRetry<Data, QueryVariables>(
  document: DocumentNode,
  requestOptions: {
    variables?: QueryVariables;
    mcApiUrl: string;
    headers: HeadersInit;
  },
  retryCount: number = 0
): Promise<Data> {
  const token = credentialsStorage.getToken(requestOptions.mcApiUrl);

  client.setEndpoint(`${requestOptions.mcApiUrl}/graphql`);
  client.setHeaders(requestOptions.headers);
  if (token) {
    client.setHeader('x-mc-cli-access-token', token);
  }

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
}: TFetchCustomApplicationOptions) => {
  const customAppData = await requestWithTokenRetry<
    TFetchCustomApplicationFromCliQuery,
    TFetchCustomApplicationFromCliQueryVariables
  >(FetchCustomApplicationFromCli, {
    variables: { entryPointUriPath },
    mcApiUrl,
    headers: {
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return customAppData.organizationExtensionForCustomApplication;
};

const updateCustomApplication = async ({
  mcApiUrl,
  applicationId,
  organizationId,
  data,
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
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return updatedCustomAppsData.updateCustomApplication;
};

const createCustomApplication = async ({
  mcApiUrl,
  organizationId,
  data,
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
      'x-graphql-target': GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });
  return createdCustomAppData.createCustomApplication;
};

const fetchUserOrganizations = async ({
  mcApiUrl,
}: TFetchUserOrganizationsOptions) => {
  const userOrganizations = await requestWithTokenRetry<
    TFetchMyOrganizationsFromCliQuery,
    TFetchMyOrganizationsFromCliQueryVariables
  >(FetchMyOrganizationsFromCli, {
    mcApiUrl,
    headers: {
      'x-graphql-target': GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
    },
  });
  return userOrganizations.myOrganizations;
};

export {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
};
