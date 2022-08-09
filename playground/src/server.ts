import express from 'express';
import dotenv from 'dotenv-flow';
dotenv.config();
// eslint-disable-next-line import/first
import echoHandler from '../api/echo';

const app = express();
const port = process.env.PLAYGROUND_SERVER_PORT || 3003;

// @ts-ignore
app.get('/api/echo', echoHandler);
// @ts-ignore
app.post('/api/echo', echoHandler);

app.listen(port, () => {
  console.log(`Playground server listening on port ${port}`);
});

module.exports = {};
