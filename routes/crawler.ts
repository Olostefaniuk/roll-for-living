import { Router } from 'express';

export const crawlerRouter = Router();

crawlerRouter
  .get('/add-form', (req, res) => {
    res.render('crawler/add-form');
  })
  .post('/', (req, res) => {
    res.send('dodaj postac');
  });
