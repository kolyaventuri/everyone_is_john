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

    for (let i = 0; i < 5; i++) {
      players.push(new Player(new MockSocket(), `id-${i}`));
    }

    auction = new Auction(players);
  });

  test('allows each player to bid', () => {
    const playerA = players[0];
    const playerB = players[1];

    auction.bid(playerA, 2);

    auction.bid(playerB, 3);

    const expected = [
      {player: playerA, bid: 2},
      {player: playerB, bid: 3}
    ];

    expect(auction.bids).toEqual(expected);
  });
});
