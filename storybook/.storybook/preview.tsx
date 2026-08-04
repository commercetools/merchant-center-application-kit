import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';
import { withPaddingDecorator } from '../src/decorators/padding-decorator';
import { withProvidersDecorator } from '../src/decorators/providers-decorator';

const preview: Preview = {
  parameters: {
    chromatic: {
      // A story is captured only if it overrides this AND carries the `vrt` tag.
      disableSnapshot: true,
      // No viewport pinned, deliberately; see `uikit-vrt-migration-decisions.md`.
    },
  },
  decorators: [withPaddingDecorator, withProvidersDecorator],
};

export default preview;
