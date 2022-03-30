const { GraphQLClient } = require('graphql-request');
const { GRAPHQL_TARGETS } = require('@commercetools-frontend/constants');
const userAgent = require('./user-agent');
const requireGraphqlHelper = require('./require-graphql');
const requireGraphql = requireGraphqlHelper(__dirname);

const FetchCustomApplicationFromCli = requireGraphql(
  './fetch-custom-application.settings.graphql'
);
const UpdateCustomApplicationFromCli = requireGraphql(
  './update-custom-application.settings.graphql'
);
const CreateCustomApplicationFromCli = requireGraphql(
  './create-custom-application.settings.graphql'
);
const FetchMyOrganizationsFromCli = requireGraphql(
  './fetch-user-organizations.core.graphql'
);

const graphQLClient = (uri, token, target = GRAPHQL_TARGETS.SETTINGS_SERVICE) =>
  new GraphQLClient(`${uri}/graphql`, {
    headers: {
      'x-graphql-target': target,
      'x-mc-cli-access-token': token,
      'x-user-agent': userAgent,
    },
  });

const fetchCustomApplication = async ({
  mcApiUrl,
  token,
  entryPointUriPath,
}) => {
  const variables = {
    entryPointUriPath,
  };

  try {
    const customAppData = await graphQLClient(mcApiUrl, token).request(
      FetchCustomApplicationFromCli,
      variables
    );
    return customAppData.organizationExtensionForCustomApplication;
  } catch (error) {
    throw new Error(error.response.message);
  }
};

const updateCustomApplication = async ({
  mcApiUrl,
  token,
  applicationId,
  organizationId,
  data,
}) => {
  const variables = {
    organizationId,
    applicationId,
    data,
  };

  try {
    const updatedCustomAppsData = await graphQLClient(mcApiUrl, token).request(
      UpdateCustomApplicationFromCli,
      variables
    );
    return updatedCustomAppsData.updateCustomApplication;
  } catch (error) {
    throw new Error(error.response.message);
  }
};

const createCustomApplication = async ({
  mcApiUrl,
  token,
  organizationId,
  data,
}) => {
  const variables = {
    organizationId,
    data,
  };

  try {
    const createdCustomAppData = await graphQLClient(mcApiUrl, token).request(
      CreateCustomApplicationFromCli,
      variables
    );
    return createdCustomAppData.createCustomApplication;
  } catch (error) {
    throw new Error(error.response.message);
  }
};

const fetchUserOrganizations = async ({ mcApiUrl, token }) => {
  try {
    const userOrganizations = await graphQLClient(
      mcApiUrl,
      token,
      GRAPHQL_TARGETS.ADMINISTRATION_SERVICE
    ).request(FetchMyOrganizationsFromCli);
    return userOrganizations.myOrganizations;
  } catch (error) {
    throw new Error(error.response.message);
  }
};

module.exports = {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
};
