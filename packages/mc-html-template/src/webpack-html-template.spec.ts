import type { TemplateParameter } from 'html-webpack-plugin';
import webpackHtmlTemplate from './webpack-html-template';

const buildTemplateParams = (css: string[], js: string[] = ['/app.123.js']) =>
  ({
    htmlWebpackPlugin: { files: { css, js } },
  } as unknown as TemplateParameter);

describe('webpackHtmlTemplate', () => {
  describe('app CSS', () => {
    it('should emit stylesheets as non-blocking preloads marked as app CSS', () => {
      const html = webpackHtmlTemplate(buildTemplateParams(['/app.abc.css']));

      expect(html).toContain(
        '<link rel="preload" as="style" data-mc-css href="__CDN_URL__app.abc.css">'
      );
      // The blocking form must be gone, or first paint still waits on it.
      expect(html).not.toContain("rel='stylesheet' type='text/css'");
    });

    it('should trim the leading slash so __CDN_URL__ concatenates correctly', () => {
      const html = webpackHtmlTemplate(buildTemplateParams(['/app.abc.css']));

      expect(html).toContain('href="__CDN_URL__app.abc.css"');
      expect(html).not.toContain('href="__CDN_URL__/app.abc.css"');
    });

    it('should keep vendor CSS ahead of app CSS', () => {
      const html = webpackHtmlTemplate(
        buildTemplateParams(['/app.abc.css', '/vendor.def.css'])
      );

      expect(html.indexOf('vendor.def.css')).toBeLessThan(
        html.indexOf('app.abc.css')
      );
    });

    it('should mark every emitted stylesheet', () => {
      const html = webpackHtmlTemplate(
        buildTemplateParams(['/vendor.def.css', '/app.abc.css'])
      );

      expect(html.match(/data-mc-css/g)).toHaveLength(2);
    });

    it('should emit no css links when the build produced none', () => {
      const html = webpackHtmlTemplate(buildTemplateParams([]));

      expect(html).not.toContain('data-mc-css');
    });
  });

  describe('links it must not affect', () => {
    it('should not claim the template font links as app CSS', () => {
      // The Vite path needs a bundle check to avoid this; here the CSS list is
      // supplied directly, so template links are structurally untouchable.
      const html = webpackHtmlTemplate(buildTemplateParams(['/app.abc.css']));
      const interTag = html
        .split('<link')
        .find((tag) => tag.includes('family=Inter')) as string;

      expect(interTag).toBeDefined();
      expect(interTag).toContain('data-nimbus-fonts=""');
      expect(interTag).not.toContain('data-mc-css');
    });

    it('should leave the noscript Open Sans fallback a real stylesheet', () => {
      const html = webpackHtmlTemplate(buildTemplateParams(['/app.abc.css']));
      const noscript = html.slice(
        html.indexOf('<noscript>'),
        html.indexOf('</noscript>')
      );

      expect(noscript).toContain('rel="stylesheet"');
      expect(noscript).not.toContain('data-mc-css');
    });
  });

  describe('scripts', () => {
    it('should still emit deferred script tags', () => {
      const html = webpackHtmlTemplate(
        buildTemplateParams([], ['/app.123.js'])
      );

      expect(html).toContain(
        '<script src="__CDN_URL__app.123.js" defer></script>'
      );
    });
  });
});
