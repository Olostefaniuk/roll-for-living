import { Router } from 'express';
import { CrawlerRecord } from '../records/crawler.record';
// kazdy link do pokoju bedzie renderowal w zaleznosci od sukcesu albo porazki inny hbs, ktory bedzie mial inne przejscia
// kazdy render dostanie przekazane id po to, zeby mogl nastepnie przekazac go w liku
export const dungeonRouter = Router();

dungeonRouter
  .get('/choose-form', (req, res) => {
    res.render('dungeon/choose-form');
  })
  .get('/room/0/:id', (req, res) => {
    res.render('dungeon/rooms/0', {
      id: req.body.id,
    });
  })
  .get('/room/1/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    const speedRoll = await c.speedTest();

    if (speedRoll) {
      await res.render('dungeon/rooms/1/1s', { id });
    } else {
      c.hp -= 1;
      console.log(c);
      await c.updateHp();
      await res.render('dungeon/rooms/1/1f', { id });
    }
  });
