import SocketEvents from '../../lib/socket-events';
import Player from '../../models/player';

import repos from '../../services/repositories';
import MockSocket from '../helpers/mock-socket';

const {playerRepository, gameRepository} = repos;

describe('SocketEvents', () => {
  describe('connect', () => {
    test('emits a turtle event', () => {
      const socket = new MockSocket();
      const events = new SocketEvents(socket);

      events.connect();

      expect(socket.emit).toHaveBeenCalledWith('turtle');
    });
  });

  describe('initPlayer', () => {
    let events = null;
    const socket = new MockSocket();

    beforeEach(() => {
      playerRepository.clear();
      events = new SocketEvents(socket);
    });

    test('creates a new player when no ID supplied', () => {
      events.initPlayer();

      expect(playerRepository.count).toEqual(1);
    });

    test('creates a new player with an ID', () => {
      const id = 'some-id';

      events.initPlayer(id);

      expect(playerRepository.count).toEqual(1);

      expect(playerRepository.find(id)).toBeInstanceOf(Player);
    });

    test('does not create a new player if the player exists', () => {
      const id = 'some-id';

      events.initPlayer(id);
      events.initPlayer(id);

      expect(playerRepository.count).toEqual(1);

      expect(playerRepository.find(id)).toBeInstanceOf(Player);
    });

    test('emits a socket event', () => {
      events.initPlayer();

      expect(socket.emit).toHaveBeenCalledWith('player.connect', expect.any(String));
    });

    test('stores ID on socket', () => {
      events.initPlayer();

      const player = playerRepository.all()[0];
      const id = player._id;

      expect(socket._uid).toEqual(id);
    });

    test('stores socket on player', () => {
      events.initPlayer();

      const player = playerRepository.all()[0];

      expect(player.socket).toEqual(socket);
    });
  });

  describe('createGame', () => {
    let events = null;
    const socket = new MockSocket();

    beforeEach(() => {
      gameRepository.clear();
      playerRepository.clear();

      events = new SocketEvents(socket);
    });

    test('it rejects if no player exists', () => {
      events.createGame();

      expect(socket.emit).toHaveBeenCalledWith('game.initiate.reject');
    });

    test('it creates a game', () => {
      events.initPlayer();

      const player = playerRepository.all()[0];
      socket.player = player;

      events.createGame();

      expect(gameRepository.count).toEqual(1);

      const game = gameRepository.all()[0];

      expect(socket.emit).toHaveBeenCalledWith('game.initiate', game.id);
    });
  });
});
