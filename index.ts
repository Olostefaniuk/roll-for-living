import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import { static as eStatic, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { homeRouter } from './routes/home';
import { crawlerRouter } from './routes/crawler';
import { dungeonRouter } from './routes/dungeon';
import { survivorsRouter } from './routes/survivors';
import './utils/db';
import { CrawlerRecord } from './records/crawler.record';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
  extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers:
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/crawler', crawlerRouter);
app.use('/dungeon', dungeonRouter);
app.use('/survivors', survivorsRouter);
// app.use(handleError)

const crawler = new CrawlerRecord({
  id: '9358f203-0524-40a9-b51d-408b641b2671',
  name: 'test 2',
  strength: 5,
  speed: 3,
  stamina: 4,
  intelligence: 2,

});
crawler.roomCounter = 5;
crawler.hp -= 4;
console.log(crawler.hp);
crawler.updateRoom();
crawler.updateHp();

app.listen(3000, 'localhost', () => {
  console.log('listening on port 3000');
});
