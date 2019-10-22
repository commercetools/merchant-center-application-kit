# Test Utils

To facilitate testing components that implement connectors, we expose some **test utils**.

## Table of Contents

- [project-extension-image-regex](#project-extension-image-regex)
  - [createFetchProjectExtensionImageRegexMock](#createfetchprojectextensionimageregexmock)
  - [createGraphqlResponseForProjectExtensionImageRegexQuery](#creategraphqlresponseforprojectextensionimageregexquery)

## project-extension-image-regex

The following are utility functions to help create mocks for Apollo about requests concerning the `project-extension-image-regex` connector.

### `createFetchProjectExtensionImageRegexMock`

This is the main function to create a mock for fetching the image regex settings. You can optionally pass an object to customize the response.

### `createGraphqlResponseForProjectExtensionImageRegexQuery`

This function can be used to customized the response data and should be used together with the `createFetchProjectExtensionImageRegexMock` function.
