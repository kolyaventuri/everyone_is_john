import Player from '../../models/player';
import Game from '../../models/game';
import repos from '../../services/repositories';

const {playerRepository} = repos;

describe('Player', () => {
  let player = null;

  beforeEach(() => {
    playerRepository.clear();

    player = new Player('some-random-id');
  });

  test('it has an ID', () => {
    expect(player.id).not.toBeNull();

    expect(player.id).toEqual(expect.any(String));
  });

  test('it has a default name', () => {
    expect(player.name).not.toBeNull();

    expect(player.name).toEqual(expect.any(String));
  });

  test('its name can change', () => {
    const newName = 'JohnDoe';

    expect(player.name).not.toEqual(newName);

    player.name = newName;

    expect(player.name).toEqual(newName);
  });

  test('can join a game', () => {
    const owner = new Player('id');
    const game = new Game(owner);

    expect(game.players).toHaveLength(0);

    player.joinGame(game.id);

    expect(game.players).toHaveLength(1);

    expect(player._game).toEqual(game.id);
    expect(player.game).toEqual(game);
  });

  test('cannot join a game that doesn\'t exist', () => {
    const fn = () => {
      player.joinGame('nope');
    };

    expect(fn).toThrow();
  });

  test('cannot join a game if they are already in one', () => {
    const owner = new Player('z');
    const game2 = new Game(owner);

    player.joinGame(game2.id);

    const fn = () => {
      player.joinGame(game2.id);
    };

    expect(fn).toThrow('Player is already in a game.');
  });
});
