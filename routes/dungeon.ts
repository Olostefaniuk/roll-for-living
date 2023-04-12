import { Router } from 'express';
import { CrawlerRecord } from '../records/crawler.record';
// kazdy link do pokoju bedzie renderowal w zaleznosci od sukcesu albo porazki inny hbs, ktory bedzie mial inne przejscia
// kazdy render dostanie przekazane id po to, zeby mogl nastepnie przekazac go w liku
export const dungeonRouter = Router();
//@TODO zrobić routeer do roomd na smierc i 99 na wyjscie
dungeonRouter

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
// wejscie do pokoju 1- test na szybkość i kierowanie na tej podstawie hbs 1s albo 1f,
  .get('/room/1/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id; // tego prawdopodobnie juz nie potrzebuję, odkąd poprawilem opisy w bazie danych
    c.roomCounter = 1;
    await c.updateRoom();
    const speedRoll = await c.speedTest();

    if (speedRoll) {
      await res.render('dungeon/rooms/1/1s', { id });
    } else {
      c.hp -= 2;
      console.log(c);
      await c.updateHp();
      await res.render('dungeon/rooms/1/1f', { id });
    }
  })
// wejcie do pokoju 2- test na siłę i kierowanie do 2s albo 2f
  .get('/room/2/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 2;
    await c.updateRoom();
    const strRoll = await c.strengthTest();

    if (strRoll) {
      c.hp -= 1;
      await c.updateHp;
      await res.render('/dungeon/rooms/2/2s', { id });
    } else {
      c.hp -= 3;
      await c.updateHp;
      await res.render('/dungeon/rooms/2/2f');
    }
  });
