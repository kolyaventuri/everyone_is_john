import Player from '../../models/player';
import PlayerStat from '../../models/player-stat';
import Game from '../../models/game';
import repos from '../../services/repositories';

const {playerRepository} = repos;

describe('Player', () => {
  let player = null;

  beforeEach(() => {
    playerRepository.clear();

    player = new Player('some-random-id');
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

  test('can be reactivated', () => {
    player.deactivate();

    player.activate();

    expect(player.active).toEqual(true);
    expect(player.timeoutStart).toBeNull();
  });

  test('can join a game', () => {
    const owner = new Player('id');
    const game = new Game(owner);

    expect(game.players).toHaveLength(0);

    player.joinGame(game.id);

    expect(game.players).toHaveLength(1);
    expect(game.players).toContain(player);

    expect(player._game).toEqual(game.id);
    expect(player.game).toEqual(game);
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
    const owner = new Player('z');
    const game = new Game(owner);

    player.joinGame(game.id);

    const fn = () => {
      player.joinGame(game.id);
    };

    expect(fn).toThrow('Player is already in a game.');
  });

  test('can leave a game', () => {
    const owner = new Player('z');
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
