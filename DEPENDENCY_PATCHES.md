# Dependency Patches

This document is meant to keep track of the **dependency patches** that are currently being used in this repository.

This includes things like using Yarn `resolutions` field, pinning dependency versions, etc.

We use a document to give context around the patches, to link to possible issues etc. Whenever we can get rid of the patch, please remove the related entry in this document as well.

<!-- Below define a list of the dependencies in "resolutions" -->

**`graphql`**

We can't upgrade the `graphql` dependency to `>=15`, as there are still packages that haven't upgraded yet (for example Gatsby).
