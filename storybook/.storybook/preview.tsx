import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';
import { withPaddingDecorator } from '../src/decorators/padding-decorator';
import { withProvidersDecorator } from '../src/decorators/providers-decorator';

const preview: Preview = {
  decorators: [withPaddingDecorator, withProvidersDecorator],
  parameters: {
    // `includeNames` also sorts each component's states, which otherwise keep
    // their declaration order.
    options: { storySort: { method: 'alphabetical', includeNames: true } },
  },
};

export default preview;
