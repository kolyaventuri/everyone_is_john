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
    window.location.assign(`/game/${id}`);
  }

  rejectInitGame() {
    window.location.assign('/');
  }

  joinGame(id) {
    window.location.assign(`/game/${id}`);
  }

  rejectJoin() {
    window.showError('Game does not exist.');
  }

  genericReject() {
    window.location.assign('/');
  }
}
