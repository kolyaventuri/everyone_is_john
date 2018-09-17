class MockSocket {
  emit = jest.fn()

  join = jest.fn(room => {
    this.rooms[room] = this.rooms[room] || [];
    this.rooms[room].push(this);
  })

  events = {}

  rooms = {}

  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  in = name => {
    return {
      emit: (event, data) => {
        for (const client of this.rooms[name]) {
          client.emit(event, data);
        }
      }
    };
  }

  on(name, fn) {
    this.events[name] = fn;
  }

  _trigger(name, data) {
    this.events[name](data);
  }
}

export default MockSocket;
