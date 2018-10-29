import handleError from './handle-error';

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

  joinGame(id) {
    window.location.assign(`/game/${id}`);
  }

  rejectInitGame({err}) {
    if (err) {
      handleError(err);
    }
    window.location.assign('/');
  }

  rejectJoin({err}) {
    if (err) {
      handleError(err);
    }
    window.showError('Game does not exist.');
  }

  genericReject({err}) {
    if (err) {
      handleError(err);
    }
    window.location.assign('/');
  }
}
