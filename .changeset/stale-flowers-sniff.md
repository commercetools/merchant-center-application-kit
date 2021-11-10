---
'@commercetools-frontend/application-components': patch
---

The `<*ModalPage>` components now accept a prop `afterOpenStyles` to overwrite the default styles. You can pass a "class name" or a CSS-in-JS style object.
This should be used only in cases the default styles are causing some layout issues.
