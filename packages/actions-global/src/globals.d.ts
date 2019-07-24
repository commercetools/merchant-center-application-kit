export {};

declare global {
  interface Window {
    app: {
      revision: string;
      env: string;
      location: string;
      cdnUrl: string;
      frontendHost: string;
      trackingSentry?: string;
    };
  }
}
