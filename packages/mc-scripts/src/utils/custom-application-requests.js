const { GraphQLClient } = require('graphql-request');
const requireGraphqlHelper = require('./require-graphql');
const requireGraphql = requireGraphqlHelper(__dirname);

const graphQLClient = (uri, token) =>
  new GraphQLClient(`${uri}/graphql`, {
    headers: {
      Cookie: `mcAccessToken=${token}`,
      'x-graphql-target': 'settings',
    },
  });

const fetchCustomApplications = async ({ uri, token }) => {
  const variables = {
    organizationId: '7100d799-f572-4c92-b0de-024663b29ad5',
  };

  const OrganizationExtensionForCustomApplication = requireGraphql(
    './fetch-custom-applications.settings.graphql'
  );
  const customAppsData = await graphQLClient(uri, token).request(
    OrganizationExtensionForCustomApplication,
    variables
  );
  return customAppsData;
};

const updateCustomApplicationsConfig = async ({
  uri,
  token,
  newConfig,
  applicationId,
  organizationId,
}) => {
  // const variables = {
  //   organizationId,
  //   applicationId,
  //   data: newConfig
  // }
  // const UpdateCustomApplication = requireGraphql('./update-custom-application.settings.graphql')
  // const updatedCustomAppsData = await graphQLClient(uri, token).request(UpdateCustomApplication, variables)
  // return updatedCustomAppsData
};

module.exports = { fetchCustomApplications, updateCustomApplicationsConfig };
