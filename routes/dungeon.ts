import { Router } from 'express';
import { CrawlerRecord } from '../records/crawler.record';
// kazdy link do pokoju bedzie renderowal w zaleznosci od sukcesu albo porazki inny hbs, ktory bedzie mial inne przejscia
// kazdy render dostanie przekazane id po to, zeby mogl nastepnie przekazac go w liku
export const dungeonRouter = Router();

dungeonRouter
// @todo dlaczego nie przekazuje sie id przez liste?
  .get('/choose-form', async (req, res) => {
    const crawlers = await CrawlerRecord.listAllInside();
    res.render('dungeon/choose-form', {
      crawlers,
    });
  })
  .post('/roomx', async (req, res) => {
    const { id } = req.body;
    console.log(id);

    const crawler = await CrawlerRecord.getOne(id);
    console.log(crawler);
    const room = crawler.roomCounter;
    res.render('dungeon/rooms/roomx', {
      room,
      id,
    });
  })
  .get('/room/0/:id', (req, res) => {
    res.render('dungeon/rooms/0', {
      id: req.body.id,
    });
  })
// notatka do wejscia do pokoju 1
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
