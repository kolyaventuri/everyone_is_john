import GameRepository from '../../services/game-repository';
import Game from '../../models/game';

describe('GameRepository', () => {
  test('throws properly named error upon duplicate', () => {
    const repo = new GameRepository();

    const game = new Game('id');

    repo.insert(game);

    const fn = () => {
      repo.insert(game);
    };

    expect(fn).toThrow('Game already exists.');
  });
});
