import Slug from '../lib/slug';

export default class Game {
  constructor() {
    this._id = Math.floor(Math.random() * 1e5);
    this._slug = Slug.random();
  }

  get id() {
    return this._id;
  }

  get slug() {
    return this._slug;
  }
}
