import Game from '../../models/game';
import Player from '../../models/player';
import GameMode from '../../lib/game-mode';
import MockSocket from '../helpers/mock-socket';
import repos from '../../services/repositories';

const {playerRepository, gameRepository} = repos;

describe('GameMode', () => {
  let game = null;
  let owner = null;
  let mockIo = null;
  let player = null;

  beforeEach(() => {
    playerRepository.clear();
    gameRepository.clear();

    owner = new Player(new MockSocket(), 'id');
    player = new Player(new MockSocket(), '1');

    mockIo = new MockSocket();

    game = new Game(mockIo, owner);
  });

  test('SETUP allows users to join the game', () => {
    game.mode = GameMode.SETUP;

    const result = game.addPlayer(player);

    expect(result).toBeTruthy();
    expect(game.players).toHaveLength(1);
  });

  test('Non-SETUP disallows users to join', () => {
    // VOTING mode
    game.mode = GameMode.VOTING;
    const resultVoting = game.addPlayer(player);
    expect(resultVoting).toBeFalsy();
    expect(game.players).toHaveLength(0);

    // PLAYING mode
    game.mode = GameMode.PLAYING;
    const resultPlaying = game.addPlayer(player);
    expect(resultPlaying).toBeFalsy();
    expect(game.players).toHaveLength(0);

    // LOCKED mode
    game.mode = GameMode.LOCKED;
    const resultLocked = game.addPlayer(player);
    expect(resultLocked).toBeFalsy();
    expect(game.players).toHaveLength(0);
  });

  test.skip('Bidding is allowed in VOTING state', () => {
    game.addPlayer(player);
    game.mode = GameMode.VOTING;
  });
});
