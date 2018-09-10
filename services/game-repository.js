export default class GameRepository {
  constructor() {
    this._games = {};
  }

  insert(game) {
    if (this._games[game.id]) {
      throw new Error('Game already exists.');
    }

    this._games[game.id] = game;
  }

  get count() {
    return Object.keys(this._games).length;
  }
}
