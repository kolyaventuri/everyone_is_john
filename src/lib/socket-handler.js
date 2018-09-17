import SocketEvents from './socket-events';

class SocketHandler {
  constructor(socket, gm) {
    this.socket = socket;
    this.event = new SocketEvents(gm);

    this.registerEvents();
  }

  static register(socket, gm) {
    (() => new this(socket, gm))();
  }

  registerEvents() {
    const {socket, event} = this;

    socket.on('turtle', () => {
      event.initPlayer(this.socket);
    });

    socket.on('generic.reject', event.genericReject);

    socket.on('player.connect', event.playerConnect);

    socket.on('game.initiate', event.initGame);
    socket.on('game.initiate.reject', event.rejectInitGame);

    socket.on('game.join', event.joinGame);
    socket.on('game.join.reject', event.joinReject);
  }
}

export default SocketHandler;
