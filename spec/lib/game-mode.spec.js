import Game from '../../models/game';
import Auction from '../../models/auction';
import Player from '../../models/player';
import GameMode from '../../lib/game-mode';
import MockSocket from '../helpers/mock-socket';
import repos from '../../services/repositories';

const {playerRepository, gameRepository} = repos;
const {SETUP, VOTING, PLAYING, LOCKED} = GameMode;

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
    game.mode = SETUP;

    const result = game.addPlayer(player);

    expect(result).toBeTruthy();
    expect(game.players).toHaveLength(1);
  });

  test('Non-SETUP disallows users to join', () => {
    // VOTING mode
    game.mode = VOTING;
    const resultVoting = game.addPlayer(player);
    expect(resultVoting).toBeFalsy();
    expect(game.players).toHaveLength(0);

    // PLAYING mode
    game.mode = PLAYING;
    const resultPlaying = game.addPlayer(player);
    expect(resultPlaying).toBeFalsy();
    expect(game.players).toHaveLength(0);

    // LOCKED mode
    game.mode = LOCKED;
    const resultLocked = game.addPlayer(player);
    expect(resultLocked).toBeFalsy();
    expect(game.players).toHaveLength(0);
  });

  test('Activating VOTING state starts new auction', () => {
    game.mode = LOCKED;

    expect(game.auction).toBeNull();

    game.mode = VOTING;

    expect(game.auction).toBeInstanceOf(Auction);
  });

  test('Bidding is allowed in VOTING state', () => {
    game.addPlayer(player);
    game.mode = VOTING;

    const result = game.addBid(player, 1);

    expect(result).toEqual(1);
  });

  test('game.addBid returns false if bid fails', () => {
    game.addPlayer(player);
    game.mode = VOTING;

    const result = game.addBid(player, player.stats.willpower + 1);
    expect(result).toEqual(false);

    const resultNegative = game.addBid(player, -1);
    expect(resultNegative).toEqual(false);
  });

  test('Bidding is NOT allowed in other states', () => {
    game.addPlayer(player);

    // SETUP
    game.mode = SETUP;
    const resultSetup = game.addBid(player, 1);
    expect(resultSetup).toEqual(false);

    // PLAYING
    game.mode = PLAYING;
    const resultPlaying = game.addBid(player, 1);
    expect(resultPlaying).toEqual(false);

    // LOCKED
    game.mode = LOCKED;
    const resultLocked = game.addBid(player, 1);
    expect(resultLocked).toEqual(false);
  });
});
