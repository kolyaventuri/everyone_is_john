import Chance from 'chance';
import repos from '../services/repositories';
import PlayerStat from './player-stat';

const {playerRepository, gameRepository} = repos;

const chance = new Chance();

export default class Player {
  constructor(id) {
    this._id = id;
    this._name = chance.name({middle: true, prefix: true});
    this._game = null;

    this._stats = new PlayerStat();

    playerRepository.insert(this);
  }

  joinGame(gameId) {
    if (this._game) {
      throw new Error('Player is already in a game.');
    }

    const game = gameRepository.find(gameId);

    game.addPlayer(this);
    this._game = gameId;
  }

  leaveGame() {
    this.game.kickPlayer(this);

    this._game = null;
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

  get game() {
    if (!this._game) {
      return null;
    }

    return gameRepository.find(this._game);
  }

  get stats() {
    return this._stats;
  }
}
