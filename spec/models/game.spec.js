import Game from '../../models/game';
import Player from '../../models/player';
import repos from '../../services/repositories';
import MockSocket from '../helpers/mock-socket';

const {playerRepository, gameRepository} = repos;

describe('Game', () => {
  let game = null;
  let owner = null;
  let mockIo = null;

  beforeEach(() => {
    playerRepository.clear();
    gameRepository.clear();

    owner = new Player(new MockSocket(), 'id');

    mockIo = new MockSocket();
    game = new Game(mockIo, owner);
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
    const player1 = new Player(new MockSocket(), 'a');
    const player2 = new Player(new MockSocket(), 'b');
    const player3 = new Player(new MockSocket(), 'c');

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
    const player = new Player(new MockSocket(), 'a');

    expect(game.players).toHaveLength(0);

    game.addPlayer(player);

    expect(game.players).toHaveLength(1);
  });

  test('player added is joine to game/:id/all room', () => {
    const socket = new MockSocket();
    const player = new Player(socket, 'a');

    game.addPlayer(player);

    const room = `game/${game.id}/all`;

    expect(player.socket.join).toHaveBeenCalledWith(room);
  });

  test('cannot add player twice', () => {
    const player = new Player(new MockSocket(), 'a');

    expect(game.players).toHaveLength(0);

    game.addPlayer(player);
    game.addPlayer(player);

    expect(game.players).toHaveLength(1);
  });

  test('can kick players', () => {
    const player = new Player(new MockSocket(), 'a');

    game.addPlayer(player);

    game.kickPlayer(player);

    expect(game.players).toHaveLength(0);
  });

  test('cannot kick non-existant player', () => {
    const player = new Player(new MockSocket(), 'a');
    const player2 = new Player(new MockSocket(), 'b');

    game.addPlayer(player);

    expect(game.players).toHaveLength(1);

    game.kickPlayer(player2);

    expect(game.players).toHaveLength(1);
  });

  test('can be deleted', () => {
    game.destroy();

    expect(gameRepository.count).toEqual(0);
  });

  test('allows for emitting of events to entire room', () => {
    const player1Socket = mockIo;
    const player2Socket = mockIo;
    const player3Socket = new MockSocket();

    const player1 = new Player(player1Socket, 'a');
    const player2 = new Player(player2Socket, 'b');
    const player3 = new Player(player3Socket, 'c');

    const game2 = new Game(new MockSocket(), owner);

    player1.joinGame(game.id);
    player2.joinGame(game.id);
    player3.joinGame(game2.id);

    game.emitAll('event', 'data');

    expect(player1Socket.emit).toHaveBeenCalledWith('event', 'data');
    expect(player2Socket.emit).toHaveBeenCalledWith('event', 'data');
    expect(mockIo.emit).toHaveBeenCalledTimes(2);
    expect(player3Socket.emit).not.toHaveBeenCalled();
  });
});
