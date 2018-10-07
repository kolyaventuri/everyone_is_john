import Chance from 'chance';
import Slug from '../lib/slug';
import repos from '../services/repositories';
import GameMode from '../lib/game-mode';
import Auction from './auction';

const {gameRepository, playerRepository} = repos;

const chance = new Chance();

const gameModeRegex = /^Symbol\(GM_(.*)\)$/;

export default class Game {
  auction = null

  constructor(io, owner) {
    this.io = io;

    this._id = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    this._slug = Slug.random();

    this._owner = owner.id;
    this._players = [];

    this._mode = GameMode.SETUP;

    gameRepository.insert(this);

    this.roomPrefix = `game/${this._id}`;

    const room = `${this.roomPrefix}/gm`;

    owner.socket.join(room);
  }

  addPlayer(player) {
    if (this.mode !== GameMode.SETUP) {
      return false;
    }

    if (this._players.indexOf(player.id) < 0) {
      this._players.push(player.id);
    }

    const room = `game/${this.id}/all`;
    const privateRoom = `game/${this.id}/player/${player.id}`;

    player.socket.join(room);
    player.socket.join(privateRoom);

    return player;
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

  emit(data) {
    const {io, roomPrefix} = this;
    const {channel, event, payload} = data;

    io.in(`${roomPrefix}/${channel}`).emit(event, payload);
  }

  addBid(player, bid) {
    if (this.mode === GameMode.VOTING) {
      const bidResult = this.auction.bid(player, bid);

      if (bidResult === false) {
        return false;
      }

      return bid;
    }

    return false;
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
    const string = this.mode.toString().match(gameModeRegex)[1];

    return string;
  }

  set mode(value) {
    const newMode = Object.values(GameMode).find(m => m === value);

    if (!newMode) {
      return;
    }

    this._mode = value;

    if (this._mode === GameMode.VOTING) {
      this.auction = new Auction(this.players);
    } else {
      this.auction = null;
    }
  }
}
