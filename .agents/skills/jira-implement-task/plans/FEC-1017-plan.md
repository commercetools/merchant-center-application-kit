# FEC-1017: Shell Splitter + Region Composition

Branch: `FEC-1017-shell-splitter-region` (off `FEC-1016-nimbus-bundler-plugins`)

## Tasks

### Task 1: Export `MC_RIGHT_PANEL` constant

- Add `MC_RIGHT_PANEL = 'mc-right-panel' as const` to `application-shell/src/constants.ts`
- Export it from `application-shell/src/index.ts`
- Test: verify the constant is exported with correct value

### Task 2: Create `shell-splitter.tsx` (Nimbus-present path)

- New file: `application-shell/src/components/shell-splitter/shell-splitter.tsx`
- Wraps children in `NimbusProvider` + `Splitter.Root` + `Region` target
- Publishes collapse controls via Region value
- `Splitter.Main` gets `containerType="inline-size"` for cqw scoping
- Aside starts collapsed (0 width, no visual change)

### Task 3: Create `shell-splitter-stub.tsx` (Nimbus-absent fallback)

- New file: `application-shell/src/components/shell-splitter/shell-splitter-stub.tsx`
- Passthrough component — renders children directly, no splitter

### Task 4: Create `shell-splitter/index.tsx` with lazy loading + try-require

- Dynamic import of `shell-splitter.tsx` behind try-require detection
- Falls back to stub when `@commercetools/nimbus` is absent
- Uses `React.lazy` + `Suspense` (fallback renders children directly)

### Task 5: Wire shell-splitter into `ApplicationShellAuthenticated`

- Wrap the `MainContainer` content area with the shell-splitter
- The splitter wraps the main content (Main pane) and exposes the aside (Region target)

### Task 6: Update `PortalsContainer` CSS for cqw overlay scoping

- Add `cqw`-based width to modal positioning when container queries are supported
- `@supports (container-type: inline-size)` with `cqw` fallback

### Task 7: Add changeset
