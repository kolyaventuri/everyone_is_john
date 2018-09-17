import SocketHandler from '../../../src/lib/socket-handler';
import MockSocket from '../../helpers/mock-socket';

const mockInitPlayer = jest.fn();
const mockInitGame = jest.fn();
const mockRejectInit = jest.fn();
const mockJoinGame = jest.fn();
const mockGenericReject = jest.fn();
const mockJoinReject = jest.fn();

const socket = new MockSocket();

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

    joinGame(id) {
      mockJoinGame(id);
    }

    genericReject() {
      mockGenericReject();
    }

    joinReject() {
      mockJoinReject();
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

  test('triggers game.join with an ID', () => {
    const id = 'ABCDE';

    socket._trigger('game.join', id);

    expect(mockJoinGame).toHaveBeenCalledWith(id);
  });

  test('triggers generic.reject', () => {
    socket._trigger('generic.reject');

    expect(mockGenericReject).toHaveBeenCalled();
  });

  test('triggers game.join.reject', () => {
    socket._trigger('game.join.reject');

    expect(mockJoinReject).toHaveBeenCalled();
  });
});
