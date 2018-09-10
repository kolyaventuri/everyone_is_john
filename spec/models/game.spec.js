import Game from '../../models/game';

describe('Game', () => {
  let game = null;

  beforeAll(() => {
    game = new Game();
  });

  test('it has an ID', () => {
    expect(game.id).not.toBeNull();

    expect(game.id).toEqual(expect.any(String));
    expect(game.id).toHaveLength(5);
  });

  test('it has a slug', () => {
    expect(game.slug).not.toBeNull();

    expect(game.slug).toEqual(expect.any(String));
  });
});
