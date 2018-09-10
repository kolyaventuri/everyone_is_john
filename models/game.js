export default class Game {
  constructor() {
    this._id = Math.floor(Math.random() * 1e5);
  }

  get id() {
    return this._id;
  }
}
