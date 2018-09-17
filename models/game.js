import Chance from 'chance';
import Slug from '../lib/slug';
import repos from '../services/repositories';
import GameMode from '../lib/game-mode';

const {gameRepository, playerRepository} = repos;

const chance = new Chance();

export default class Game {
  constructor(io, owner) {
    this.io = io;

    this._id = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    this._slug = Slug.random();

    this._owner = owner.id;
    this._players = [];

    this._mode = GameMode.SETUP;

    gameRepository.insert(this);

    this._roomPrefix = `game/${this._id}`;

    const room = `${this._roomPrefix}/gm`;

    owner.socket.join(room);
  }

  addPlayer(player) {
    if (this._players.indexOf(player.id) < 0) {
      this._players.push(player.id);
    }

    const room = `game/${this.id}/all`;
    const privateRoom = `game/${this.id}/player/${player.id}`;

    player.socket.join(room);
    player.socket.join(privateRoom);
  }

  kickPlayer(player) {
    const index = this._players.indexOf(player.id);
    if (index < 0) {
      return;
    }

    this._players.splice(index, 1);
  }

  destroy() {
    gameRepository.destroy(this);
  }

  emitAll(event, data) {
    const roomPrefix = this._roomPrefix;

    this.io.in(`${roomPrefix}/all`).emit(event, data);
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

  get mode() {
    return this._mode;
  }

  get modeString() {
    const keys = Object.keys(GameMode);
    return keys[this._mode - 1];
  }

  set mode(value) {
    const keys = Object.keys(GameMode);

    if (!value || !keys[value - 1]) {
      return;
    }

    this._mode = value;
  }
}
