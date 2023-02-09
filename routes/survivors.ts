import { Router } from 'express';

export const survivorsRouter = Router();

survivorsRouter
  .get('/survivors', (req, res) => {
    res.send('lista gosci, ktorzy wyszli');
  });
