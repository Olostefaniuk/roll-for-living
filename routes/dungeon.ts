import { Router } from 'express';

export const dungeonRouter = Router();

dungeonRouter
  .get('/choose-form', (req, res) => {
    res.send('tu jest wybor goscia');
  })
  .post('/room', (req, res) => {
    res.send('tu jest pierwszy dungeon');
  });
