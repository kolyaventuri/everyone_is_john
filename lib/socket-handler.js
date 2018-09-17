import SocketEvents from './socket-events';

class SocketHandler {
  constructor(io) {
    this.io = io;

    this.register();
  }

  register() {
    this.io.on('connection', socket => {
      const events = new SocketEvents(this.io, socket);

      // Connection pingback
      events.connect();

      // Initial setup
      socket.on('player.init', events.initPlayer.bind(events));

      // Game creation
      socket.on('game.create', events.createGame.bind(events));

      // Game join
      socket.on('game.join', events.joinGame.bind(events));
    });
  }
}

export default SocketHandler;

