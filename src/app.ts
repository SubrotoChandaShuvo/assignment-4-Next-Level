import express, { type Application } from 'express';
import prisma from './lib/prisma';

const app : Application = express();

app.get('/', (req, res) => {
  res.send('server is running');
});

export default app;