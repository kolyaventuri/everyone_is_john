export default class SocketEvents {
  constructor(gm) {
    this.GameManager = gm;
  }

  initGame(data) {
    window.location = `/game/${data.id}`;
  }

  rejectInitGame() {
    window.location = '/';
  }
}
