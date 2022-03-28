const { GraphQLClient } = require('graphql-request');
const requireGraphqlHelper = require('./require-graphql');
const requireGraphql = requireGraphqlHelper(__dirname);

const graphQLClient = (uri, token, target = 'settings') =>
  new GraphQLClient(`${uri}/graphql`, {
    headers: {
      'x-graphql-target': target,
      'x-mc-cli-access-token': token,
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

  const OrganizationExtensionForCustomApplication = requireGraphql(
    './fetch-custom-application.settings.graphql'
  );
  try {
    const customAppData = await graphQLClient(mcApiUrl, token).request(
      OrganizationExtensionForCustomApplication,
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
  const UpdateCustomApplication = requireGraphql(
    './update-custom-application.settings.graphql'
  );
  try {
    const updatedCustomAppsData = await graphQLClient(mcApiUrl, token).request(
      UpdateCustomApplication,
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
  const CreateCustomApplication = requireGraphql(
    './register-custom-application.settings.graphql'
  );
  try {
    const createdCustomAppsData = await graphQLClient(mcApiUrl, token).request(
      CreateCustomApplication,
      variables
    );
    return createdCustomAppsData.createCustomApplication;
  } catch (error) {
    throw new Error(error.response.message);
  }
};

const fetchUserOrganizations = async ({ mcApiUrl, token }) => {
  const Organizations = requireGraphql(
    './fetch-user-organizations.core.graphql'
  );
  try {
    const userOrganizations = await graphQLClient(
      mcApiUrl,
      token,
      'administration'
    ).request(Organizations);
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
