import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 4004;
const TARGET_URL = 'https://assistant-api.commercetools.vercel.app'; // Replace with the URL you want to proxy to

app.use(
  cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Baggage',
      'sentry-trace',
    ], // Allow specific headers
  })
);

// Proxy middleware
const proxy = createProxyMiddleware({
  target: TARGET_URL,
  changeOrigin: true,
});

// Use the proxy middleware
app.use('/', proxy);

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
