export default class Auction {
  bids = []

  winner = null

  constructor(players) {
    this.players = players;
  }

  determineWinner = () => {
    const bids = this.bids.sort((a, b) => {
      if (a.bid < b.bid) {
        return 1;
      }
      if (a.bid > b.bid) {
        return -1;
      }

      return 0;
    });

    this.winner = bids[0].player;
  }

  bid(player, bid) {
    if (player.stats.willpower < bid || bid < 0) {
      return false;
    }

    const {bids} = this;

    bids.push({player, bid});

    if (bids.length === this.players.length) {
      this.determineWinner();
    }
  }
}
