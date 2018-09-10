import Player from '../../models/player';

describe('Player', () => {
  let player = null;

  beforeAll(() => {
    player = new Player('some-random-id');
  });

  test('it has an ID', () => {
    expect(player.id).not.toBeNull();

    expect(player.id).toEqual(expect.any(String));
  });
});
