import PlayerRepository from '../../services/player-repository';
import Player from '../../models/player';

describe('PlayerRepository', () => {
  let repo = null;

  beforeEach(() => {
    repo = new PlayerRepository();
  });

  test('can have players added to it', () => {
    const player = new Player('id');

    repo.insert(player);

    expect(repo.count).toEqual(1);
  });

  test('disallows duplicate players', () => {
    const player = new Player('id');

    repo.insert(player);

    const fn = () => {
      repo.insert(player);
    };

    expect(fn).toThrow('Player already exists.');

    expect(repo.count).toEqual(1);
  });
});
