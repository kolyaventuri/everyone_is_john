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
});
