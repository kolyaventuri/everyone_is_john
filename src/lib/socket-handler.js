class SocketHandler {
  constructor(socket, gm) {
    this.socket = socket;
    this.gm = gm;
  }

  static register(socket, gm) {
    (() => new this(socket, gm))();
  }
}

export default SocketHandler;
