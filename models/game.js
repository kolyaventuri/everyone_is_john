import Chance from 'chance';
import Slug from '../lib/slug';

const chance = new Chance();

export default class Game {
  constructor() {
    this._id = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    this._slug = Slug.random();
  }

  get id() {
    return this._id;
  }

  get slug() {
    return this._slug;
  }
}
