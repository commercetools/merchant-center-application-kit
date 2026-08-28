---
'@commercetools-frontend/application-shell': patch
---

Move the SaveToolbar portal target outside `<MainContainer>` so it is not clipped by `overflow: hidden` when a modal opens. The portal target now occupies the same grid cell as MainContainer via `grid-column: 2/3; grid-row: 3/4; align-self: end`, keeping it visually at the bottom of the content area without being a child of the element that gets clipped.
