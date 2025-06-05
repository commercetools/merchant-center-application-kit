---
"@commercetools-frontend/application-components": patch
"@commercetools-frontend/application-shell": patch
---

Add backwards compatible bidirectional initialization of Custom Views

This improves the stability of the initialization of Custom Views but requires old Custom View to be updated to this version so they communicate about their ready state with the host. It's recommended to update to this version if possible specifically if you encounter initialization issues with Custom Views.

