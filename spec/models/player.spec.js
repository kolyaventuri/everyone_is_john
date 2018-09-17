import Player from '../../models/player';
import PlayerStat from '../../models/player-stat';
import Game from '../../models/game';
import repos from '../../services/repositories';
import MockSocket from '../helpers/mock-socket';

const {playerRepository} = repos;

global.setTimeout = jest.fn();

describe('Player', () => {
  let player = null;
  let socket = null;

  beforeEach(() => {
    playerRepository.clear();

    socket = new MockSocket();
    player = new Player(socket, 'some-random-id');
  });

  test('has a socket', () => {
    expect(player.socket).toEqual(socket);
  });

  test('has an ID', () => {
    expect(player.id).not.toBeNull();

    expect(player.id).toEqual(expect.any(String));
  });

  test('has a default name', () => {
    expect(player.name).not.toBeNull();

    expect(player.name).toEqual(expect.any(String));
  });

  test('name can change', () => {
    const newName = 'JohnDoe';

    expect(player.name).not.toEqual(newName);

    player.name = newName;

    expect(player.name).toEqual(newName);
  });

  test('has an active flag', () => {
    expect(player.active).toEqual(true);
  });

  test('can be deactivated and given a timeout', () => {
    player.deactivate();

    expect(player.active).toEqual(false);
    expect(player.timeoutStart).toBeInstanceOf(Date);
  });

  test('when they are deactivated a timeout is started to call destroy', () => {
    player.deactivate();

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000 * 60);
  });

  test('can be destroyed', () => {
    const owner = new Player(new MockSocket(), 'id');
    const game = new Game(owner);

    player.joinGame(game.id);

    player.destroy();

    expect(playerRepository.count).toEqual(1);
    expect(game.players).toHaveLength(0);
  });

  test('can be reactivated', () => {
    player.deactivate();

    player.activate();

    expect(player.active).toEqual(true);
    expect(player.timeoutStart).toBeNull();
  });

  test('can join a game', () => {
    const owner = new Player(new MockSocket(), 'id');
    const game = new Game(owner);

    expect(game.players).toHaveLength(0);

    player.joinGame(game.id);

    expect(game.players).toHaveLength(1);
    expect(game.players).toContain(player);

    expect(player._game).toEqual(game.id);
    expect(player.game).toEqual(game);
  });

  test('is subscribed to the public room upon joining game', () => {
    const owner = new Player(new MockSocket(), 'id');
    const game = new Game(owner);

    const room = `game/${game.id}/all`;

    player.joinGame(game.id);

    expect(player.socket.join).toHaveBeenCalledWith(room);
  });

  test('is subscribed to private channel upon joining a game', () => {
    const owner = new Player(new MockSocket(), 'id');
    const game = new Game(owner);

    const room = `game/${game.id}/player/${player.id}`;

    player.joinGame(game.id);

    expect(player.socket.join).toHaveBeenCalledWith(room);
  });

  test('can have no game joined', () => {
    expect(player.game).toBeNull();
  });

  test('cannot join a game that doesn\'t exist', () => {
    const fn = () => {
      player.joinGame('nope');
    };

    expect(fn).toThrow();
  });

  test('cannot join a game if they are already in one', () => {
    const owner = new Player(new MockSocket(), 'z');
    const game = new Game(owner);

    player.joinGame(game.id);

    const fn = () => {
      player.joinGame(game.id);
    };

    expect(fn).toThrow('Player is already in a game.');
  });

  test('can leave a game', () => {
    const owner = new Player(new MockSocket(), 'z');
    const game = new Game(owner);

    player.joinGame(game.id);

    player.leaveGame();

    expect(player._game).toBeNull();
    expect(game.players).toHaveLength(0);
  });

  test('has player stats', () => {
    expect(player.stats).toBeInstanceOf(PlayerStat);
  });
});
