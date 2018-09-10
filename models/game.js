import Chance from 'chance';
import Slug from '../lib/slug';
import repos from '../services/repositories';

const {gameRepository} = repos;

const chance = new Chance();

export default class Game {
  constructor(owner) {
    this._id = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    this._slug = Slug.random();

    this._owner = owner.id;
    this._players = [];

    gameRepository.insert(this);
  }

  get id() {
    return this._id;
  }

  get slug() {
    return this._slug;
  }

  get owner() {
    return null;
  }
}
