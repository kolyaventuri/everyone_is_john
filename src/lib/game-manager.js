import socket from './socket';
import SocketHandler from './socket-handler';

const GameManager = {
  create: () => {
    socket.emit('game.create');
  },

  joinGame: gameID => {
    if (!gameID) {
      return;
    }

    socket.emit('game.join', gameID);
  }
};

SocketHandler.register(socket, GameManager);

export default GameManager;
