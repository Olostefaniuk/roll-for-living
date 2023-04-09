import { Router } from 'express';
import { CrawlerRecord } from '../records/crawler.record';

export const survivorsRouter = Router();

survivorsRouter
  .get('/survivors', async (req, res) => {
    const survivorsList = await CrawlerRecord.listSurvivors();

    const mappedList = survivorsList.map((crawler) => ({
      crawler,
    }));

    res.render('survivors/survivors', {
      survivorsList,
      mappedList,
    });
  });
