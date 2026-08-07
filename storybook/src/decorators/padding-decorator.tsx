import type { Decorator } from '@storybook/react-vite';

// Chromatic crops to rendered content, so edge-painted focus rings and shadows clip.
const paddedStyle = { padding: '1rem' };

export const withPaddingDecorator: Decorator = (Story, context) =>
  // `fullscreen` stories mean to touch the edges.
  context.parameters?.layout === 'fullscreen' ? (
    <Story />
  ) : (
    <div style={paddedStyle}>
      <Story />
    </div>
  );
