import { Router } from 'express';
import { CrawlerRecord } from '../records/crawler.record';
import { diceRoll } from '../utils/diceRoll';
// kazdy link do pokoju bedzie renderowal w zaleznosci od sukcesu albo porazki inny hbs, ktory bedzie mial inne przejscia
// kazdy render dostanie przekazane id po to, zeby mogl nastepnie przekazac go w liku
export const dungeonRouter = Router();
// @TODO zrobić routeer do roomd na smierc i 99 na wyjscie
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
    console.log(req.params.id);
    res.render('dungeon/rooms/0', {
      id: req.params.id,
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
      await res.render('dungeon/rooms/2/2s', { id });
    } else {
      c.hp -= 3;
      await c.updateHp;
      await res.render('dungeon/rooms/2/2f', { id });
    }
  })
// wejście do pokoju 3, test na speed i kierowanie do 3s albo 3f
  .get('/room/3/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 3;
    await c.updateRoom();
    const speedRoll = await c.speedTest();

    if (speedRoll) {
      await res.render('dungeon/rooms/3/3s', { id });
    } else {
      c.hp -= 3;
      await c.updateHp;
      await res.render('dungeon/rooms/3/3s', { id });
    }
  })
// wejście do pokoju 4, test na int i kierowanie do 4s albo 4f
  .get('/room/4/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 4;
    await c.updateRoom();
    const intRoll = await c.intelligenceTest();

    if (intRoll) {
      c.hp += 1;
      await c.updateHp;
      await res.render('dungeon/rooms/4/4s', { id });
    } else {
      c.hp -= 5;
      await c.updateHp;
      await res.render('dungeon/rooms/4/4f', { id });
    }
  })
// wejście do pokoju 5, test na stamina i kierowanie do 5s albo 5f
  .get('/room/5/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 5;
    await c.updateRoom();
    const staminaRoll = await c.staminaTest();

    if (staminaRoll) {
      await res.render('dungeon/rooms/5/5s', { id });
    } else {
      c.hp -= 2;
      await c.updateHp;
      await res.render('dungeon/rooms/5/5f', { id });
    }
  })
// wejście do pokoju 6 rzut kością. 50% szans i kierowanie do 6s albo 6f
  .get('/room/6/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 6;
    await c.updateRoom();
    const roll = diceRoll(10);

    if (roll >= 5) {
      await res.render('dungeon/rooms/6/6s', { id });
    } else {
      c.hp -= 2;
      await c.updateHp;
      await res.render('dungeon/rooms/6/6f', { id });
    }
  })
// wejscie do pokoju 7, test na int
  .get('/room/7/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 7;
    await c.updateRoom();
    const intRoll = await c.intelligenceTest();

    if (intRoll) {
      await res.render('dungeon/rooms/7/7s', { id });
    } else {
      c.hp -= 4;
      await c.updateHp;
      await res.render('dungeon/rooms/7/7f', { id });
    }
  })
// wejscie do 8 i test na int
  .get('/room/8/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 8;
    await c.updateRoom();
    const intRoll = await c.intelligenceTest();

    if (intRoll) {
      await res.render('dungeon/rooms/8/8s', { id });
    } else {
      c.hp -= 2;
      await c.updateHp;
      await res.render('dungeon/rooms/8/8f', { id });
    }
  })
// wejscie do 9 i test na cud
  .get('/room/9/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 9;
    await c.updateRoom();
    const roll = diceRoll(100);

    if (roll !== 1) {
      await res.render('dungeon/rooms/9/9s', { id });
    } else {
      c.hp -= 2;
      await c.updateHp;
      await res.render('dungeon/rooms/9/9f', { id });
    }
  })
  .get('/room/10/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;
    c.roomCounter = 10;
    await c.updateRoom();
    const speedRoll = await c.speedTest();

    if (speedRoll) {
      await res.render('dungeon/rooms/10/10s', { id });
    } else {
      c.hp -= 5;
      await c.updateHp;
      await res.render('dungeon/rooms/10/10s', { id });
    }
  })
// pokoj informujacy, ze umarles
  .get('/room/roomd/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;

    c.hp = 0;

    await c.updateHp();
    await res.render('dungeon/rooms/roomd', { id });
  })
// pokoj informujacy o tym, ze wygrales
  .get('/room/99/:id', async (req, res) => {
    const { id } = req.params;
    const c = await CrawlerRecord.getOne(id);
    c.id = id;

    c.roomCounter = 99;

    await c.updateRoom();
    await res.render('dungeon/rooms/99', { id });
  });
