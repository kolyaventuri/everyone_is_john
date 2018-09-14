import GameManager from '../../src/lib/game-manager';
import socket from '../../src/lib/socket';

jest.mock('../../src/lib/socket', () => ({
  emit: jest.fn()
}));

describe('GameManager', () => {
  test('.create() emits a create event', () => {
    GameManager.create();

    expect(socket.emit).toBeCalledWith('game.create');
  });
});
