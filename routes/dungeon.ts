import { Router } from 'express';

export const dungeonRouter = Router();

dungeonRouter
  .get('/choose-form', (req, res) => {
    res.render('dungeon/choose-form');
  })
  .get('/:room', (req, res) => {
    const { room } = req.params;
    res.render(`dungeon/${room}`);
  });
