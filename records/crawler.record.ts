import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { ValidationError } from '../utils/errors';
import { diceRoll } from '../utils/diceRoll';
import { pool } from '../utils/db';

type CrawlerRecordResult = [CrawlerRecord[], FieldPacket[]];

export class CrawlerRecord {
  public id?: string;

  public readonly name?: string;

  public readonly strength: number;

  public readonly speed: number;

  public readonly stamina: number;

  public readonly intelligence: number;

  public hp?: number;

  public roomCounter?: number;

  constructor(obj: Omit<CrawlerRecord, 'insert'| 'updateHp' | 'updateRoom' | 'speedTest' | 'strengthTest' | 'staminaTest' | 'intelligenceTest'>) {
    const {
      id, name, strength, speed, stamina, intelligence, hp, roomCounter,
    } = obj;

    const stats = [strength, speed, stamina, intelligence];

    const sum = [strength, speed, stamina, intelligence].reduce((prev, cur) => prev + cur, 0);

    for (const stat of stats) {
      if (stat < 1) {
        throw new ValidationError('Minimum value of a single stat is 1');
      }
    }
    for (const stat of stats) {
      if (stat > 5) {
        throw new ValidationError('Maximum value of a single stat is 5');
      }
    }

    if (sum !== 14) {
      throw new ValidationError('You have max 14 points to distribute among stats.');
    }

    if (name.length <= 1 && name.length > 20) {
      throw new ValidationError('You have to think a little bit more on that name. Between 2 and 20 letters. You can do it, I believe in You');
    }

    this.id = id ?? uuid();
    this.name = name;
    this.strength = strength;
    this.speed = speed;
    this.stamina = stamina;
    this.intelligence = intelligence;
    this.hp = hp ?? 10;
    this.roomCounter = roomCounter ?? 0;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `crawlers`(`id`, `name`, `strength`, `speed`, `stamina`, `intelligence`, `hp`, `roomCounter`) VALUES(:id, :name, :strength, :speed, :stamina, :intelligence, :hp, :roomCounter)', {
      id: this.id,
      name: this.name,
      strength: this.strength,
      speed: this.speed,
      stamina: this.stamina,
      intelligence: this.intelligence,
      hp: this.hp,
      roomCounter: this.roomCounter,
    });
    return this.id;
  }

  async updateRoom(): Promise<void> {
    await pool.execute('UPDATE `crawlers` SET `roomCounter` = :roomCounter WHERE id = :id', {
      roomCounter: this.roomCounter,
      id: this.id,
    });
  }

  async updateHp(): Promise<void> {
    await pool.execute('UPDATE `crawlers` SET `hp` = :hp WHERE id = :id', {
      hp: this.hp,
      id: this.id,
    });
  }

  async strengthTest(): Promise<boolean> {
    const roll = diceRoll(6);
    console.log(roll);
    return this.strength < roll;
  }

  async staminaTest(): Promise<boolean> {
    const roll = diceRoll(6);
    console.log(roll);
    return this.stamina < roll;
  }

  async speedTest(): Promise<boolean> {
    const roll = diceRoll(6);
    console.log(roll);
    return this.speed < roll;
  }

  async intelligenceTest(): Promise<boolean> {
    const roll = diceRoll(6);
    console.log(roll);
    return this.intelligence < roll;
  }

  static async getOne(id:string): Promise<CrawlerRecord | null> {
    const [result] = await pool.execute('SELECT * FROM `crawlers` WHERE `id` = :id', {
      id,
    }) as CrawlerRecordResult;
    return result.length === 0 ? null : new CrawlerRecord(result[0]);
  }

  static async listAllInside(): Promise<CrawlerRecord[] | null> {
    const [result] = await pool.execute('SELECT * FROM `crawlers` WHERE `roomcounter` != 99 AND `hp` > 0') as CrawlerRecordResult;
    return result;
  }

  static async listSurvivors(): Promise<CrawlerRecord[]> {
    const [result] = await pool.execute('SELECT * FROM `crawlers` WHERE `roomCounter` = 99 AND `hp` > 0') as CrawlerRecordResult;
    return result.map((obj) => new CrawlerRecord(obj));
  }

  static async isNameTaken(name:string): Promise<boolean> {
    const [result] = await pool.execute('SELECT * FROM `crawlers` WHERE `name` = :name', {
      name,
    }) as CrawlerRecordResult;
    return result.length > 0;
  }
}
