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

    socket.on('game.initiate', event.initGame);
    socket.on('game.initiate.reject', event.rejectInitGame);
  }
}

export default SocketHandler;
