import Chance from 'chance';
import Slug from '../lib/slug';
import repos from '../services/repositories';

const {gameRepository, playerRepository} = repos;

const chance = new Chance();

export default class Game {
  constructor(owner) {
    this._id = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    this._slug = Slug.random();

    this._owner = owner.id;
    this._players = [];

    gameRepository.insert(this);
  }

  addPlayer(player) {
    if (this._players.indexOf(player.id) < 0) {
      this._players.push(player.id);
    }
  }

  get id() {
    return this._id;
  }

  get slug() {
    return this._slug;
  }

  get owner() {
    return playerRepository.find(this._owner);
  }

  get players() {
    return this._players.map(id => {
      return playerRepository.find(id);
    });
  }
}
