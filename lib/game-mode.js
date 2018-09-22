const GameMode = {
  SETUP: Symbol('GM_SETUP'),
  VOTING: Symbol('GM_VOTING'),
  PLAYING: Symbol('GM_PLAYING'),
  LOCKED: Symbol('GM_LOCKED')
};

Object.freeze(GameMode);

export default GameMode;
