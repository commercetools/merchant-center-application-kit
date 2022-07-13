import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';

const app = express();
app.use(
  createSessionMiddleware({
    audience: 'https://my-api-server.com',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.use((request: Request, response: Response, next: NextFunction) => {
  // `request.session` contains the useful information
});
