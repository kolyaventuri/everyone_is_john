import Game from '../../models/game';
import Player from '../../models/player';
import repos from '../../services/repositories';
import socket from '../helpers/mock-socket';

const {playerRepository, gameRepository} = repos;

describe('Game', () => {
  let game = null;
  let owner = null;

  beforeEach(() => {
    playerRepository.clear();
    gameRepository.clear();

    owner = new Player('id');
    owner.socket = socket;

    game = new Game(owner);
  });

  test('subscribes owner to gm socket', () => {
    const room = `game/${game.id}/gm`;

    expect(owner.socket.join).toHaveBeenCalledWith(room);
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

  test('cannot add player twice', () => {
    const player = new Player('a');

    expect(game.players).toHaveLength(0);

    game.addPlayer(player);
    game.addPlayer(player);

    expect(game.players).toHaveLength(1);
  });

  test('can kick players', () => {
    const player = new Player('a');

    game.addPlayer(player);

    game.kickPlayer(player);

    expect(game.players).toHaveLength(0);
  });

  test('cannot kick non-existant player', () => {
    const player = new Player('a');
    const player2 = new Player('b');

    game.addPlayer(player);

    expect(game.players).toHaveLength(1);

    game.kickPlayer(player2);

    expect(game.players).toHaveLength(1);
  });

  test('can be deleted', () => {
    game.destroy();

    expect(gameRepository.count).toEqual(0);
  });
});
