import { Router } from 'express';

export const homeRouter = Router();

homeRouter
  .get('/', (req, res) => {
    res.send('główna');
  });
