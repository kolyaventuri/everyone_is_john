import GameManager from '../../src/lib/game-manager';
import socket from '../../src/lib/socket';

jest.mock('../../src/lib/socket', () => ({
  emit: jest.fn(),
  on: jest.fn()
}));

describe('GameManager', () => {
  test('.create() emits a create event', () => {
    GameManager.create();

    expect(socket.emit).toHaveBeenCalledWith('game.create');
  });

  test('.joinGame() emits a join event', () => {
    const id = 'ABCDE';

    GameManager.joinGame(id);

    expect(socket.emit).toHaveBeenCalledWith('game.join', id);
  });

  test('.joinGame() without an ID does not emit', () => {
    GameManager.joinGame('');

    expect(socket.emit).not.toHaveBeenCalled();
  });
});
