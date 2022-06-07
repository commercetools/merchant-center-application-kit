declare namespace Cypress {
  interface Chainable<Subject> {
    setDesktopViewport(): Chainable<Subject>;
  }
}
