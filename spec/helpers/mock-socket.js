class MockSocket {
  emit = jest.fn()

  join = jest.fn(room => {
    this.roomClients[room] = this.roomClients[room] || [];
    this.roomClients[room].push(this);
    this.rooms[room] = room;
  })

  events = {}

  rooms = {}

  roomClients = {}

  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  in = name => {
    return {
      emit: (event, data) => {
        for (const client of this.roomClients[name]) {
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
