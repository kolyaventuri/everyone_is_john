import jsdom from 'jsdom';
import SocketEvents from '../../../src/lib/socket-events';
import MockSocket from '../../helpers/mock-socket';

const {JSDOM} = jsdom;

let mockHandleError;

jest.mock('../../../src/lib/handle-error', () => {
  mockHandleError = jest.fn();
  return mockHandleError;
});

describe('SocketEvents', () => {
  let events = null;
  let socket = null;
  let err;

  global.window = new JSDOM('', {url: 'http://localhost'}).window;
  window.location.assign = jest.fn();
  window.showError = jest.fn();

  beforeAll(() => {
    events = new SocketEvents();
    socket = new MockSocket();
    err = {err: 'ERROR_NAME'};
  });

  describe('initPlayer', () => {
    test('emits player.init with an undefiend ID if none is present', () => {
      events.initPlayer(socket);

      expect(socket.emit).toHaveBeenCalledWith('player.init', undefined);
    });

    test('emits player.init with an ID', () => {
      const id = 'some-id';
      global.localStorage.uid = id;

      events.initPlayer(socket);

      expect(socket.emit).toHaveBeenCalledWith('player.init', id);
    });
  });

  describe('playerConnect', () => {
    test('it sets the localStorage.uid variable', () => {
      const id = 'some-random-id';

      events.playerConnect(id);

      expect(window.localStorage.uid).toEqual(id);
    });
  });

  describe('initGame', () => {
    test('it sends the user to the game', () => {
      const gameID = 'ABCDE';

      events.initGame(gameID);

      expect(window.location.assign).toHaveBeenCalledWith(`/game/${gameID}`);
    });
  });

  describe('rejectInitGame', () => {
    test('it sends the user back to the index', () => {
      events.rejectInitGame(err);

      expect(window.location.assign).toHaveBeenCalledWith('/');
      expect(mockHandleError).toHaveBeenCalledWith(err.err);
    });
  });

  describe('rejectJoin', () => {
    test('it triggers an error message', () => {
      events.rejectJoin(err);

      expect(window.showError).toHaveBeenCalled();
      expect(mockHandleError).toHaveBeenCalledWith(err.err);
    });
  });

  describe('joinGame', () => {
    test('sends user to game', () => {
      const id = 'ABCDE';

      events.joinGame(id);

      expect(window.location.assign).toHaveBeenCalledWith(`/game/${id}`);
    });
  });

  describe('genericReject', () => {
    test('sends the user back to /', () => {
      events.genericReject(err);

      expect(window.location.assign).toHaveBeenCalledWith('/');
      expect(mockHandleError).toHaveBeenCalledWith(err.err);
    });
  });
});
