import jsdom from 'jsdom';
import SocketEvents from '../../../src/lib/socket-events';
import MockSocket from '../../helpers/mock-socket';

const {JSDOM} = jsdom;

describe('SocketEvents', () => {
  let events = null;
  let socket = null;

  global.window = new JSDOM('', {url: 'http://localhost'}).window;
  window.location.assign = jest.fn();

  beforeAll(() => {
    events = new SocketEvents();
    socket = new MockSocket();
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
      events.rejectInitGame();

      expect(window.location.assign).toHaveBeenCalledWith('/');
    });
  });
});
