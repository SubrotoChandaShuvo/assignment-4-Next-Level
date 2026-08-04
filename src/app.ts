import express, { type Application } from 'express';

const app : Application = express();

app.get('/', (req, res) => {
  res.send('server is running');
});

export default app;