export default class Auction {
  bids = []

  constructor(players) {
    this.players = players;
  }

  bid(player, bid) {
    const {bids} = this;

    bids.push({player, bid});
  }
}
