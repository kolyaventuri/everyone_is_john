import socket from './socket';
import SocketHandler from './socket-handler';

class GameManager {
  static create() {
    socket.emit('game.create');
  }
}

SocketHandler.register(socket, GameManager);

export default GameManager;
