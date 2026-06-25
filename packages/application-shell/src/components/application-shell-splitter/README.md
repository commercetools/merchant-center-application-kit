# ApplicationShellSplitter

A shell-level resizable split pane layout powered by the Nimbus `Splitter`
component. When `@commercetools/nimbus` is installed, the shell mounts a
collapsible aside pane alongside the main content area. Consumers fill and
control the aside via Nimbus's `Region` / `useRegion` API.

## How it works

`ApplicationShellSplitter` wraps the authenticated shell content
(`ThemeSwitcher`, `RequestsInFlightLoader`, the CSS grid with NavBar/AppBar/MainContainer`)
inside a `Splitter.Root`. It is lazy-loaded via `React.lazy`with a`.catch()`
fallback so that apps without Nimbus installed see the existing layout unchanged.

### Component tree

```
ApplicationShellAuthenticated
  └─ ApplicationShellSplitter (lazy-loaded)
     └─ NimbusProvider
        └─ Splitter.Root (collapsed by default)
           ├─ Splitter.Main (containerType: inline-size)
           │  └─ {children} (the entire shell grid)
           ├─ Splitter.Handle
           └─ Splitter.Aside
              └─ Region (name=REGIONS.MC_RIGHT_PANEL)
```

### Fallback behavior

If `@commercetools/nimbus` is not installed, the dynamic `import()` fails and
the `.catch()` returns a passthrough component that renders `{children}`
directly. The `Suspense` fallback also renders `{children}`, so there is no
visible flash during chunk loading.

## Consumer API

Consumers use Nimbus's `useRegion` hook targeting `REGIONS.MC_RIGHT_PANEL`:

```tsx
import { useRegion } from '@commercetools/nimbus';
import { REGIONS } from '@commercetools-frontend/application-shell';

const MyPanel = () => {
  const { Region: Filler, value } = useRegion(REGIONS.MC_RIGHT_PANEL);

  useEffect(() => {
    value?.expand();
    return () => value?.collapse();
  }, []);

  return (
    <Filler>
      <div>Content portalled into the aside pane</div>
    </Filler>
  );
};
```

### Region value (`TApplicationShellSplitterValue`)

The Region publishes a controller object with:

| Property      | Type         | Description                        |
| ------------- | ------------ | ---------------------------------- |
| `isCollapsed` | `boolean`    | Whether the aside is collapsed     |
| `expand`      | `() => void` | Expand the aside pane              |
| `collapse`    | `() => void` | Collapse the aside pane to 0 width |
| `toggle`      | `() => void` | Toggle between expanded/collapsed  |

Import the type from `@commercetools-frontend/application-shell`:

```tsx
import type { TApplicationShellSplitterValue } from '@commercetools-frontend/application-shell';
```

## Responsive behavior

The splitter uses `useResponsiveSplitterSizes` with a 1444px breakpoint
(1024px main min + 420px aside min):

| Viewport width | Aside state | Layout                                          |
| -------------- | ----------- | ----------------------------------------------- |
| >= 1444px      | Expanded    | Side-by-side: main + handle + aside (420-640px) |
| >= 1444px      | Collapsed   | Full-width main content                         |
| < 1444px       | Expanded    | Stacked: aside takes 100% width                 |
| < 1444px       | Collapsed   | Full-width main content                         |

## Overlay scoping

`Splitter.Main` sets `containerType: 'inline-size'`, which establishes a CSS
container query context. The `PortalsContainer` in `application-components` uses
`100cqw` units inside an `@supports (width: 100cqw)` block so that modals and
dropdowns are scoped to the main content pane when the aside is open. The nav
bar width is subtracted from the cqw value to keep overlays aligned with the
content area.

## Exports

From `@commercetools-frontend/application-shell`:

- `REGIONS.MC_RIGHT_PANEL` — the Region name constant (`'mc:right-panel'`)
- `TApplicationShellSplitterValue` — TypeScript type for the Region value
