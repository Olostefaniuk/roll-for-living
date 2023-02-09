import { Router } from 'express';

export const crawlerRouter = Router();

crawlerRouter
  .get('/add-form', (req, res) => {
    res.send('tu formularz do dodnia wojownika');
  })
  .post('/', (req, res) => {
    res.send('dodaj postac');
  });
