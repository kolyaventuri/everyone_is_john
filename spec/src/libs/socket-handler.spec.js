import SocketHandler from '../../../src/lib/socket-handler';
import socket from '../../helpers/mock-socket';

const mockInitPlayer = jest.fn();

jest.mock('../../../src/lib/socket-events', () => {
  return class SocketEvents {
    initPlayer(socket) {
      mockInitPlayer(socket);
    }
  };
});

describe('SocketHandler', () => {
  test('triggers event.initPlayer on turtle', () => {
    SocketHandler.register(socket, {});

    socket._trigger('turtle');

    expect(mockInitPlayer).toHaveBeenCalledWith(socket);
  });
});
