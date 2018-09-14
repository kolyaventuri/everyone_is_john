export default class SocketEvents {
  constructor(gm) {
    this.GameManager = gm;
  }

  initPlayer(socket) {
    const id = window.localStorage.uid;

    socket.emit('player.init', id);
  }

  playerConnect(id) {
    window.localStorage.uid = id;
  }

  initGame(id) {
    window.location = `/game/${id}`;
  }

  rejectInitGame() {
    window.location = '/';
  }
}
