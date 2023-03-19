import { Router } from 'express';

export const dungeonRouter = Router();

dungeonRouter
  .get('/choose-form', (req, res) => {
    res.render('dungeon/choose-form');
  })
  .get('/room/0/:id', (req, res) => {
    res.render('dungeon/rooms/0', {
      id: req.body.id,
    });
  });

// to powinien byc patch, ponadto to bedzie jeszcze /:id jak juz wpadne na to, jak to wyciagac i przekazywac dalej. sprawdze tez zycie, jesli jest 0 to od razu render konca gry
// to nie wyjdzie, jesli chce robic rozne zabawki na rozne pokoje
// kazdy link do pokoju bedzie renderowal w zaleznosci od sukcesu albo porazki inny hbs, ktory bedzie mial inne przejscia
