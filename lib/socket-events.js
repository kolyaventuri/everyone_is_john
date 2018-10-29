import repos from '../services/repositories';
import Player from '../models/player';
import Game from '../models/game';
import errors from './common/error-ids';

const {playerRepository, gameRepository} = repos;

class SocketEvents {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
  }

  connect() {
    this.socket.emit('turtle');
  }

  initPlayer(id) {
    let player = null;
    if (id) {
      player = playerRepository.find(id);
    }

    if (!player) {
      player = new Player(this.socket, id);
    }

    this.socket._uid = player.id;

    this.socket.emit('player.connect', player.id);
  }

  createGame() {
    const player = playerRepository.find(this.socket._uid);

    if (!player) {
      return this.socket.emit('game.initiate.reject', {err: errors.DID_NOT_FIND_PLAYER});
    }

    const game = new Game(this.io, player);

    this.socket.emit('game.initiate', game.id);
  }

  joinGame(id) {
    const player = playerRepository.find(this.socket._uid);
    if (!player) {
      return this.socket.emit('generic.reject', {err: errors.DID_NOT_FIND_PLAYER});
    }

    const game = gameRepository.find(id);
    if (!game) {
      return this.socket.emit('game.join.reject', {err: errors.DID_NOT_FIND_GAME});
    }

    player.joinGame(game.id);

    this.socket.emit('game.join', game.id);
  }
}

export default SocketEvents;
