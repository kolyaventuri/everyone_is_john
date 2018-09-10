export default class Repository {
  constructor() {
    this._objects = {};
  }

  insert(obj) {
    if (this._objects[obj.id]) {
      throw new Error(`${obj.constructor.name} already exists.`);
    }

    this._objects[obj.id] = obj;
  }

  get count() {
    return Object.keys(this._objects).length;
  }
}
