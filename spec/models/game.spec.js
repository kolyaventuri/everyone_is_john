import Game from '../../models/game';
import Player from '../../models/player';
import repos from '../../services/repositories';

const {playerRepository, gameRepository} = repos;

describe('Game', () => {
  let game = null;
  let owner = null;

  beforeEach(() => {
    playerRepository.clear();
    gameRepository.clear();

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

  test('has players', () => {
    const player1 = new Player('a');
    const player2 = new Player('b');
    const player3 = new Player('c');

    // For testing, set up using IDs
    game._players = [player1.id, player3.id];

    const {players} = game;

    expect(players).toBeInstanceOf(Array);
    expect(players).toHaveLength(2);

    expect(players).toContain(player1);
    expect(players).toContain(player3);
    expect(players).not.toContain(player2);
  });

  test('can add players', () => {
    const player = new Player('a');

    expect(game.players).toHaveLength(0);

    game.addPlayer(player);

    expect(game.players).toHaveLength(1);
  });
});
