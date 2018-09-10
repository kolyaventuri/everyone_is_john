import Chance from 'chance';

const chance = new Chance();

export default class Player {
  constructor(id) {
    this._id = id;
    this._name = chance.name({middle: true, prefix: true});
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    return this._name;
  }
}
