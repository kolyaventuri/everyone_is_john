import GameRepository from '../../services/game-repository';
import Game from '../../models/game';
import Player from '../../models/player';
import MockSocket from '../helpers/mock-socket';

describe('GameRepository', () => {
  test('throws properly named error upon duplicate', () => {
    const repo = new GameRepository();

    const owner = new Player(new MockSocket(), 'id');
    const game = new Game(owner);

    repo.insert(game);

    const fn = () => {
      repo.insert(game);
    };

    expect(fn).toThrow('Game already exists.');
  });
});
