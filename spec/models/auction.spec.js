import Auction from '../../models/auction';
import Player from '../../models/player';
import MockSocket from '../helpers/mock-socket';
import repos from '../../services/repositories';

const {playerRepository} = repos;

describe('Auction', () => {
  let auction = null;
  let players = [];

  beforeEach(() => {
    players = [];
    playerRepository.clear();

    for (let i = 0; i < 3; i++) {
      players.push(new Player(new MockSocket(), `id-${i}`));
    }

    auction = new Auction(players);
  });

  test('allows each player to bid', () => {
    const playerA = players[0];
    const playerB = players[1];

    const resA = auction.bid(playerA, 2);
    const resB = auction.bid(playerB, 3);

    expect(resA).toBeUndefined();
    expect(resB).toBeUndefined();

    const expected = [
      {player: playerA, bid: 2},
      {player: playerB, bid: 3}
    ];

    expect(auction.bids).toEqual(expected);
  });

  test('disallows bids above players willpower', () => {
    const player = players[0];

    const toBid = player.stats.willpower + 1;

    const result = auction.bid(player, toBid);

    expect(result).toBeFalsy();
    expect(auction.bids).toHaveLength(0);
  });

  test('determines winner after all bids have been placed', () => {
    const [playerA, playerB, playerC] = players;

    expect(auction.winner).toBeNull();

    auction.bid(playerA, 1);
    auction.bid(playerB, 2);
    auction.bid(playerC, 1);

    expect(auction.winner).toBeDefined();
    expect(auction.winner).toEqual(playerB);
  });

  test('disallows < 0 value bids', () => {
    const [player] = players;

    const result = auction.bid(player, -1);

    expect(result).toEqual(false);
  });
});
