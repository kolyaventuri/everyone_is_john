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

  find(id) {
    return this._objects[id];
  }

  destroy(obj) {
    delete this._objects[obj.id];
  }

  clear() {
    this._objects = [];
  }

  get count() {
    return Object.keys(this._objects).length;
  }
}
