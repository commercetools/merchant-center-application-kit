import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';
import { withPaddingDecorator } from '../src/decorators/padding-decorator';
import { withProvidersDecorator } from '../src/decorators/providers-decorator';

// Every story here exists to be snapshotted, so Chromatic's capture-by-default
// stands. Opt one out with `chromatic: { disableSnapshot: true }`.
// No viewport is pinned: Chromatic's default is intentional, not an oversight.
const preview: Preview = {
  decorators: [withPaddingDecorator, withProvidersDecorator],
};

export default preview;
