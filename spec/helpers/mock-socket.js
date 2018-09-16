class Socket {
  emit = jest.fn()

  join = jest.fn()

  events = {}

  on(name, fn) {
    this.events[name] = fn;
  }

  _trigger(name, data) {
    this.events[name](data);
  }
}

export default Socket;
