import { ValidationError } from '../utils/errors';
import {v4 as uuid} from "uuid";

export class CrawlerRecord {
  public id?: string;

  public readonly name?: string;

  public readonly strength: number;

  public readonly speed: number;

  public readonly stamina: number;

  public readonly intelligence: number;

  public readonly hp = 10;

  public readonly roomCounter?: number;

  constructor(obj: CrawlerRecord) {
    const {
      id, name, strength, speed, stamina, intelligence, hp, roomCounter,
    } = obj;

    const sum = [strength, speed, stamina, intelligence].reduce((prev, cur) => prev + cur, 0);

    if (sum !== 14) {
      throw new ValidationError('You have max 14 points to distribute among stats.');
    }

    if (name.length <= 1 && name.length > 20) {
      throw new ValidationError('You have to think a little bit more on that name. Between 2 and 20 letters. You can do it, I believe in You');
    }

    if (strength > 5 || speed > 5 || stamina > 5 || intelligence > 5) {
      throw new ValidationError('Maximum value of a single stat is 5');
    }

    this.id = id ?? uuid();
    this.name = name;
    this.strength = strength;
    this.stamina = stamina;
    this.intelligence = intelligence;
    this.hp = hp;
    this.roomCounter = roomCounter ?? 0;
  }
}
