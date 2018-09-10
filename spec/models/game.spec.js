import Game from '../../models/game';
import Player from '../../models/player';

describe('Game', () => {
  let game = null;
  let owner = null;

  beforeAll(() => {
    owner = new Player('id');
    game = new Game(owner);
  });

  test('has an ID', () => {
    expect(game.id).not.toBeNull();

    expect(game.id).toEqual(expect.any(String));
    expect(game.id).toHaveLength(5);
  });

  test('has a slug', () => {
    expect(game.slug).not.toBeNull();

    expect(game.slug).toEqual(expect.any(String));
  });

  test('has an owner', () => {
    expect(game._owner).toEqual(owner.id);

    expect(game.owner).toBeInstanceOf(Player);
    expect(game.owner).toEqual(owner);
  });
});
