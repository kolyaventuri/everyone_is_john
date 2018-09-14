import SocketEvents from './socket-events';

class SocketHandler {
  constructor(io) {
    this.io = io;

    this.register();
  }

  register() {
    this.io.on('connection', socket => {
      const events = new SocketEvents(socket);

      // Connection pingback
      events.connect();

      // Initial setup
      socket.on('player.init', events.initPlayer);

      // Game creation
      socket.on('game.create', events.createGame);
    });
  }
}

export default SocketHandler;

