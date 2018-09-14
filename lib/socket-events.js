export default class SocketEvents {
  static connect(socket) {
    socket.emit('turtle');
  }
}
