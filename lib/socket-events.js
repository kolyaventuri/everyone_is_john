import repos from '../services/repositories';
import Player from '../models/player';
import Game from '../models/game';

const {playerRepository} = repos;

class SocketEvents {
  constructor(socket) {
    this.socket = socket;
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
      player = new Player(id);
    }

    this.socket._uid = player.id;

    player.socket = this.socket;

    this.socket.emit('player.connect', player.id);
  }

  createGame() {
    const player = playerRepository.find(this.socket._uid);

    if (!player) {
      return this.socket.emit('game.initiate.reject');
    }

    const game = new Game(player);

    this.socket.emit('game.initiate', game.id);
  }
}

export default SocketEvents;
