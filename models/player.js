import Chance from 'chance';
import repos from '../services/repositories';

const {playerRepository, gameRepository} = repos;

const chance = new Chance();

export default class Player {
  constructor(id) {
    this._id = id;
    this._name = chance.name({middle: true, prefix: true});

    playerRepository.insert(this);
  }

  joinGame(gameId) {
    const game = gameRepository.find(gameId);

    game.addPlayer(this);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    return this._name;
  }
}
