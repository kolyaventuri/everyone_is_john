import PlayerRepository from '../../services/player-repository';
import Player from '../../models/player';

describe('PlayerRepository', () => {
  test('throws properly named error upon duplicate', () => {
    const repo = new PlayerRepository();

    const player = new Player('id');

    repo.insert(player);

    const fn = () => {
      repo.insert(player);
    };

    expect(fn).toThrow('Player already exists.');
  });
});
