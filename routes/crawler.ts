import { Router } from 'express';

import { CrawlerRecord } from '../records/crawler.record';

import { ValidationError } from '../utils/errors';

export const crawlerRouter = Router();

crawlerRouter
  .get('/add-form', (req, res) => {
    res.render('crawler/add-form');
  })
  .post('/', async (req, res) => {
    const {
      name, strength, speed, stamina, intelligence,
    } = req.body;
    if (await CrawlerRecord.isNameTaken(name)) {
      throw new ValidationError(`${name} is taken, I'm afraid`);
    }

    const crawler = new CrawlerRecord(
      {
        ...req.body,
        strength: Number(strength),
        speed: Number(speed),
        stamina: Number(stamina),
        intelligence: Number(intelligence),
      },
    );
    await crawler.insert();

    res.render('crawler/crawler-added', {
      name: crawler.name,
      id: crawler.id,
    });
  });
