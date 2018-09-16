import SocketHandler from '../../../src/lib/socket-handler';
import socket from '../../helpers/mock-socket';

const mockInitPlayer = jest.fn();
const mockInitGame = jest.fn();
const mockRejectInit = jest.fn();

jest.mock('../../../src/lib/socket-events', () => {
  return class SocketEvents {
    initPlayer(socket) {
      mockInitPlayer(socket);
    }

    initGame(id) {
      mockInitGame(id);
    }

    rejectInitGame() {
      mockRejectInit();
    }
  };
});

describe('SocketHandler', () => {
  test('triggers event.initPlayer on turtle', () => {
    SocketHandler.register(socket, {});

    socket._trigger('turtle');

    expect(mockInitPlayer).toHaveBeenCalledWith(socket);
  });

  test('triggers game.initiate with an ID', () => {
    const id = 'ABCDE';

    socket._trigger('game.initiate', id);

    expect(mockInitGame).toHaveBeenCalledWith(id);
  });

  test('triggers game.initiate.reject', () => {
    socket._trigger('game.initiate.reject');

    expect(mockRejectInit).toHaveBeenCalled();
    expect(mockInitGame).not.toHaveBeenCalled();
  });
});
