# Dependency Patches

This document is meant to keep track of the **dependency patches** that are currently being used in this repository.

This includes things like using Yarn `resolutions` field, pinning dependency versions, etc.

We use a document to give context around the patches, to link to possible issues etc. Whenever we can get rid of the patch, please remove the related entry in this document as well.

<!-- Below define a list of the dependencies in "resolutions" -->

**`intl-messageformat-parser`**

Due to different transitive versions, we need to resolve the package to the same version, otherwise types might not match with each other.
