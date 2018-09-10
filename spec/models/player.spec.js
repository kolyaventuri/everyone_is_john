import Player from '../../models/player';
import Game from '../../models/game';

describe('Player', () => {
  let player = null;

  beforeAll(() => {
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
  });
});
