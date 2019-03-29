module.exports = ({ cssChunks = [], scriptChunks = [] }) => {
  const cssImports = cssChunks.map(
    chunkPath =>
      `<link href="__CDN_URL__${chunkPath}" rel='stylesheet' type='text/css'></link>`
  );
  const scriptImports = scriptChunks.map(
    chunkPath => `<script src="__CDN_URL__${chunkPath}"></script>`
  );

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="preconnect" href="__CDN_URL__">
    <link rel="preconnect" href="__MC_API_URL__">
    <!-- Fav and touch icons -->
    <link rel="shortcut icon" type="image/png" href="/favicon.png">
    <!-- Standard iPhone -->
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon_57x57px.png">
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon_57x57px.png">
    <!-- Retina iPhone  - COMMENTED OUT AS ICON FILES DO NOT EXIST -->
    <!-- <link rel="apple-touch-icon" sizes="114x114" href="/favicon_114x114px.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114×114" href="/favicon_114x114px.png" />-->
    <!-- Standard iPad -->
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon_72x72px.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon_72x72px.png">
    <!-- Retina iPad -->
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon_144x144px.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon_144x144px.png">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i' rel='stylesheet' type='text/css'></link>
    ${cssImports.join('\n')}
    <title>Merchant Center</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="app-loader">
      <!-- Loading screen styles -->
      <style>__LOADING_SCREEN_CSS__</style>

      <div class="loading-screen loading-screen--hidden">
        <svg class="loading-spinner" viewBox="0 0 40 40">
          <path class="loading-spinner-circle" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946, 14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
          <path class="loading-spinner-pointer" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"></path>
        </svg>
        <svg width="200" height="29" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path d="M38.342 20.486c1.102 0 1.738-.073 3.133-.367l.343 2.35c-1.077.293-2.276.44-3.476.44-5.358 0-6.9-3.353-6.9-7.268.049-3.818 2.35-7.048 6.876-7.048 1.2 0 2.227.147 3.475.465l-.465 2.325c-1.321-.294-2.104-.342-2.936-.342-2.839.048-4.234 2.153-4.283 4.6 0 2.422.906 4.845 4.233 4.845M49.304 20.51c2.814-.024 3.72-2.3 3.72-4.77-.024-2.253-.98-4.798-3.744-4.798-2.692.025-3.745 2.521-3.745 4.797 0 2.569 1.126 4.771 3.769 4.771zm0-11.917c4.405.025 6.363 3.304 6.363 7.146 0 3.744-1.689 7.096-6.387 7.12-4.601-.048-6.363-3.376-6.363-7.12 0-3.842 1.982-7.097 6.387-7.146zM73.896 22.615v-8.81c0-2.226-.832-2.838-2.227-2.838-.954 0-2.031.539-3.01 1.346.05.294.073.88.073 1.052v9.25h-2.74v-8.907c0-2.227-.661-2.766-2.056-2.766-.88 0-2.104.588-3.157 1.371v10.302h-2.716V8.838h2.716v1.174c.832-.66 2.154-1.419 3.597-1.443 1.91-.024 3.01.636 3.623 1.664 1.125-1.052 2.79-1.64 4.062-1.664 4.478-.074 4.55 3.523 4.55 5.04v9.006h-2.715M95.427 22.615v-8.81c0-2.226-.831-2.838-2.226-2.838-.955 0-2.032.539-3.01 1.346.049.294.073.88.073 1.052v9.25h-2.74v-8.907c0-2.227-.662-2.766-2.057-2.766-.88 0-2.104.588-3.157 1.371v10.302h-2.716V8.838h2.716v1.174c.833-.66 2.154-1.419 3.598-1.443 1.908-.024 3.01.636 3.622 1.664 1.126-1.052 2.79-1.64 4.062-1.664 4.478-.074 4.551 3.523 4.551 5.04v9.006h-2.716M103.035 14.124h6.044c-.098-2.79-1.492-3.353-2.789-3.353-2.056-.024-3.01 1.37-3.255 3.353zm7.782 5.97l.416 2.227c-1.224.416-2.912.612-4.233.612-5.433 0-6.755-3.646-6.755-7.292s1.616-7.023 6.167-7.023c2.814 0 5.163 1.737 5.188 6.166l-.025 1.444h-8.662c.049 2.692 1.493 4.331 4.209 4.331 1.076 0 2.202-.122 3.695-.465zM121.582 11.358a7.379 7.379 0 0 0-1.762-.195c-1.689-.025-2.57.808-3.206 1.468v9.984h-2.716V8.838h2.716v1.223a4.503 4.503 0 0 1 3.182-1.395 6.356 6.356 0 0 1 2.275.368l-.489 2.324M129.533 20.486c1.102 0 1.738-.073 3.132-.367l.344 2.35c-1.077.293-2.276.44-3.476.44-5.359 0-6.9-3.353-6.9-7.268.049-3.818 2.349-7.048 6.876-7.048 1.2 0 2.227.147 3.475.465l-.465 2.325c-1.322-.294-2.105-.342-2.936-.342-2.839.048-4.234 2.153-4.284 4.6 0 2.422.907 4.845 4.234 4.845M136.898 14.124h6.045c-.098-2.79-1.493-3.353-2.79-3.353-2.056-.024-3.01 1.37-3.255 3.353zm7.782 5.97l.416 2.227c-1.224.416-2.912.612-4.234.612-5.432 0-6.754-3.646-6.754-7.292s1.616-7.023 6.167-7.023c2.815 0 5.164 1.737 5.188 6.166l-.024 1.444h-8.663c.049 2.692 1.493 4.331 4.209 4.331 1.076 0 2.202-.122 3.695-.465zM154.662 11.09h-3.744v6.68c0 1.394.171 2.374 1.59 2.569.784.074 1.591 0 2.374-.098l.171 2.35c-.807.146-1.957.17-2.422.17-3.206-.121-4.405-1.761-4.405-4.33v-7.342h-1.982V9.205l1.982-.22V5.779h2.692v3.06h3.744v2.25M162.565 20.51c2.815-.024 3.72-2.3 3.72-4.77-.024-2.253-.979-4.798-3.744-4.798-2.692.025-3.745 2.521-3.745 4.797 0 2.569 1.127 4.771 3.77 4.771zm0-11.917c4.405.025 6.363 3.304 6.363 7.146 0 3.744-1.689 7.096-6.387 7.12-4.6-.048-6.363-3.376-6.363-7.12 0-3.842 1.982-7.097 6.387-7.146zM177.197 20.51c2.814-.024 3.72-2.3 3.72-4.77-.025-2.253-.98-4.798-3.744-4.798-2.692.025-3.745 2.521-3.745 4.797 0 2.569 1.126 4.771 3.769 4.771zm0-11.917c4.405.025 6.363 3.304 6.363 7.146 0 3.744-1.69 7.096-6.387 7.12-4.601-.048-6.363-3.376-6.363-7.12 0-3.842 1.982-7.097 6.387-7.146zM185.71 22.615h2.619V3.919h-2.619zM191.094 19.948c1.542.391 2.985.587 3.89.587 1.078 0 2.179-.22 2.252-1.517.074-1.37-1.346-1.787-2.96-2.472-1.836-.758-3.818-1.786-3.77-4.331.05-1.273.808-3.769 4.87-3.646 1.224.024 2.692.22 3.915.538l-.464 2.251c-1.444-.342-2.52-.49-3.573-.513-1.175 0-2.08.367-2.129 1.468-.024.93.71 1.42 2.52 2.153 1.836.759 4.43 1.738 4.308 4.625-.074 1.835-1.273 3.842-4.968 3.793-1.175-.024-3.059-.171-4.453-.66l.562-2.276" fill="#27373C"/>
            <path d="M.349 22.312a.601.601 0 0 0-.002 1.091l11.663 5.46c.156.074.325.112.493.113V16.787c-.173 0-.346.037-.508.112L.35 22.312" fill="#E3712C"/>
            <path d="M12.503 16.787v12.19c.18.003.361-.035.528-.113l11.63-5.444a.6.6 0 0 0-.002-1.09L13.011 16.9a1.2 1.2 0 0 0-.508-.113" fill="#EBA13B"/>
            <path d="M0 6.363a.596.596 0 0 0 .347.546l11.663 5.46a1.194 1.194 0 0 0 .93.039l.327-.152c1.203-.56.406-.187 11.394-5.33a.6.6 0 0 0-.002-1.091L13.011.405a1.205 1.205 0 0 0-1.016 0L.35 5.818A.603.603 0 0 0 0 6.363" fill="#23A486"/>
            <path d="M12.503 13.168v3.62c-.173 0-.346.036-.508.111L.35 22.312a.601.601 0 0 0-.348.545L0 6.77v-.407c0 .234.134.447.346.546l11.664 5.46a1.194 1.194 0 0 0 .93.039l-.02.009c-.362.167-.417.334-.417.75" fill="#CCCCC7"/>
          </g>
        </svg>
        <p class="long-loading-notice long-loading-notice--hidden">Sorry, this is taking an unusually long time.</p>
      </div>
    </div>
    <div id="app"></div>

    <!-- Loading screen handling -->
    <script>__LOADING_SCREEN_JS__</script>

    <!-- Application globals -->
    <script>window.app = __APP_ENVIRONMENT__;</script>

    <!-- Tracking scripts (load before application bundles) -->
    <script>__DATALAYER_JS__</script>
    __GTM_SCRIPT__

    <!-- Main application chunks -->
    ${scriptImports.join('\n')}
  </body>
</html>
  `;
};
