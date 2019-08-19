export {};

declare global {
  interface Window {
    app: {
      applicationName?: string;
      revision: string;
      env: string;
      location: string;
      cdnUrl: string;
      mcApiUrl: string;
      frontendHost: string;
      trackingSentry?: string;
    };
  }
}
