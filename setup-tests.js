import { jestPreviewConfigure } from 'jest-preview';

if (!process.env.CI) {
  jestPreviewConfigure({ autoPreview: true });
}
