# Dependency Patches

This document is meant to keep track of the **dependency patches** that are currently being used in this repository.

This includes things like using Yarn `resolutions` field, pinning dependency versions, etc.

We use a document to give context around the patches, to link to possible issues etc. Whenever we can get rid of the patch, please remove the related entry in this document as well.

**`@emotion/styled-base`**

We need to explicitly include this dependency in order for Yarn workspaces to hoist it and being available to the emotion packages.

See https://github.com/commercetools/ui-kit/issues/1491

Furthermore, because the UI-Kit emotion dependencies might be "older" than the emotion versions used by consumers, we also need to use Yarn resolution to force all emotion dependencies to be the same.
