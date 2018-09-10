import GameRepository from './game-repository';
import PlayerRepository from './player-repository';

const gameRepository = new GameRepository();
const playerRepository = new PlayerRepository();

export default {
  gameRepository,
  playerRepository
};
