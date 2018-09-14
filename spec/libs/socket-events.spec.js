import SocketEvents from '../../lib/socket-events';
import Player from '../../models/player';

import repos from '../../services/repositories';
import socket from '../helpers/mock-socket';

const {playerRepository} = repos;

describe('SocketEvents', () => {
  describe('initPlayer', () => {
    let events = null;

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
  });
});
