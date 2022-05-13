import { GraphQLClient } from 'graphql-request';
import {
  GRAPHQL_TARGETS,
  type TGraphQLTargets,
} from '@commercetools-frontend/constants';
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

type TFetchCustomApplicationOptions = {
  mcApiUrl: string;
  token: string;
  entryPointUriPath: string;
};
type TUpdateCustomApplicationOptions = {
  mcApiUrl: string;
  token: string;
  applicationId: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
};
type TCreateCustomApplicationOptions = {
  mcApiUrl: string;
  token: string;
  organizationId: string;
  data: TCustomApplicationDraftDataInput;
};
type TFetchUserOrganizationsOptions = {
  mcApiUrl: string;
  token: string;
};

const graphQLClient = (
  url: string,
  token: string,
  target: TGraphQLTargets = GRAPHQL_TARGETS.SETTINGS_SERVICE
) =>
  new GraphQLClient(`${url}/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-graphql-target': target,
      'x-mc-cli-access-token': token,
      'x-user-agent': userAgent,
    },
  });

const fetchCustomApplication = async ({
  mcApiUrl,
  token,
  entryPointUriPath,
}: TFetchCustomApplicationOptions) => {
  const variables = {
    entryPointUriPath,
  };

  try {
    const customAppData = await graphQLClient(mcApiUrl, token).request<
      TFetchCustomApplicationFromCliQuery,
      TFetchCustomApplicationFromCliQueryVariables
    >(FetchCustomApplicationFromCli, variables);
    return customAppData.organizationExtensionForCustomApplication;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

const updateCustomApplication = async ({
  mcApiUrl,
  token,
  applicationId,
  organizationId,
  data,
}: TUpdateCustomApplicationOptions) => {
  const variables = {
    organizationId,
    applicationId,
    data,
  };

  try {
    const updatedCustomAppsData = await graphQLClient(mcApiUrl, token).request<
      TUpdateCustomApplicationFromCliMutation,
      TUpdateCustomApplicationFromCliMutationVariables
    >(UpdateCustomApplicationFromCli, variables);
    return updatedCustomAppsData.updateCustomApplication;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

const createCustomApplication = async ({
  mcApiUrl,
  token,
  organizationId,
  data,
}: TCreateCustomApplicationOptions) => {
  const variables = {
    organizationId,
    data,
  };

  try {
    const createdCustomAppData = await graphQLClient(mcApiUrl, token).request<
      TCreateCustomApplicationFromCliMutation,
      TCreateCustomApplicationFromCliMutationVariables
    >(CreateCustomApplicationFromCli, variables);
    return createdCustomAppData.createCustomApplication;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

const fetchUserOrganizations = async ({
  mcApiUrl,
  token,
}: TFetchUserOrganizationsOptions) => {
  try {
    const userOrganizations = await graphQLClient(
      mcApiUrl,
      token,
      GRAPHQL_TARGETS.ADMINISTRATION_SERVICE
    ).request<
      TFetchMyOrganizationsFromCliQuery,
      TFetchMyOrganizationsFromCliQueryVariables
    >(FetchMyOrganizationsFromCli);
    return userOrganizations.myOrganizations;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
};
