const events = {};

const socket = {
  emit: jest.fn(),
  on: (name, fn) => {
    events[name] = fn;
  },
  _trigger: (name, data) => {
    events[name](data);
  }
};

export default socket;
