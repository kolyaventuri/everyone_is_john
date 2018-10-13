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

  describe('Joining', () => {
    test('is possible in SETUP state', () => {
      game.mode = SETUP;

      const result = game.addPlayer(player);

      expect(result).toBeTruthy();
      expect(game.players).toHaveLength(1);
    });

    test('is not possible in non-SETUP states', () => {
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
  });

  describe('Bidding', () => {
    test('activates a new auction upon VOTING state', () => {
      game.mode = LOCKED;

      expect(game.auction).toBeNull();

      game.mode = VOTING;

      expect(game.auction).toBeInstanceOf(Auction);
    });

    test('is allowed in VOTING state', () => {
      game.addPlayer(player);
      game.mode = VOTING;

      const result = game.addBid(player, 1);

      expect(result).toEqual(1);
    });

    test('fails if willpower out of bounds', () => {
      game.addPlayer(player);
      game.mode = VOTING;

      const result = game.addBid(player, player.stats.willpower + 1);
      expect(result).toEqual(false);

      const resultNegative = game.addBid(player, -1);
      expect(resultNegative).toEqual(false);
    });

    test('not allowed in non-VOTING states', () => {
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

  describe('Goals', () => {
    const goal = 'Random goal.';

    test('can be set during SETUP state', () => {
      game.addPlayer(player);
      game.mode = SETUP;
      const result = player.setGoal(goal);

      expect(result).toEqual(goal);
    });

    test('can not be set during non-SETUP states', () => {
      game.addPlayer(player);

      // VOTING
      game.mode = VOTING;
      const resultVoting = player.setGoal(goal);
      expect(resultVoting).toBeFalsy();

      // PLAYING
      game.mode = PLAYING;
      const resultPlaying = player.setGoal(goal);
      expect(resultPlaying).toBeFalsy();

      // LOCKED
      game.mode = LOCKED;
      const resultLocked = player.setGoal(goal);
      expect(resultLocked).toBeFalsy();
    });

    test('cannot be set if no game is active', () => {
      const result = player.setGoal(goal);

      expect(result).toBeFalsy();
    });
  });

  describe('Skills', () => {
    const skill = 'Random skill.';

    test('can be set during SETUP state', () => {
      game.addPlayer(player);
      game.mode = SETUP;

      const result = player.setSkill(1, skill);

      expect(result).toEqual(skill);
    });

    test('cannot be set during non-SETUP state', () => {
      game.addPlayer(player);

      // VOTING
      game.mode = VOTING;
      const resultVoting = player.setSkill(1, skill);
      expect(resultVoting).toBeFalsy();

      // PLAYING
      game.mode = PLAYING;
      const resultPlaying = player.setSkill(1, skill);
      expect(resultPlaying).toBeFalsy();

      // LOCKED
      game.mode = LOCKED;
      const resultLocked = player.setSkill(1, skill);
      expect(resultLocked).toBeFalsy();
    });

    test('cannot be set if no game is active', () => {
      const result = player.setSkill(1, skill);

      expect(result).toBeFalsy();
    });
  });
});
