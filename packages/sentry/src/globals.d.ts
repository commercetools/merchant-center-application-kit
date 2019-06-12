export {};

declare global {
  interface Window {
    app: {
      trackingSentry: string;
      revision: string;
      env: string;
      location: string;
      cdnUrl: string;
      frontendHost: string;
    };
  }
}
