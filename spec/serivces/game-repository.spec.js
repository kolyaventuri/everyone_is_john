import GameRepository from '../../services/game-repository';
import Game from '../../models/game';

describe('GameRepository', () => {
  let repo = null;

  beforeEach(() => {
    repo = new GameRepository();
  });

  test('can have games added to it', () => {
    const game = new Game('id');

    repo.insert(game);

    expect(repo.count).toEqual(1);
  });

  test('disallows duplicate players', () => {
    const game = new Game('id');

    repo.insert(game);

    const fn = () => {
      repo.insert(game);
    };

    expect(fn).toThrow();

    expect(repo.count).toEqual(1);
  });
});
