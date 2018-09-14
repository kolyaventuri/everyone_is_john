import SocketEvents from './socket-events';

class SocketHandler {
  constructor(io) {
    this.io = io;

    this.register();
  }

  register() {
    this.io.on('connection', SocketEvents.connect);
  }
}

export default SocketHandler;

