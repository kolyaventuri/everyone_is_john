import socket from './socket';
import SocketHandler from './socket-handler';

class GameManager {
  static create() {
    socket.emit('game.create');
  }

  static joinGame(gameID) {
    if (!gameID) {
      return;
    }
    socket.emit('game.join', gameID);
  }
}

SocketHandler.register(socket, GameManager);

export default GameManager;
