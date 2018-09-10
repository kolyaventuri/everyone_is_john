export default class PlayerRepository {
  constructor() {
    this._players = {};
  }

  insert(player) {
    if (this._players[player.id]) {
      throw new Error('Player already exists.');
    }

    this._players[player.id] = player;
  }

  get count() {
    return Object.keys(this._players).length;
  }
}
