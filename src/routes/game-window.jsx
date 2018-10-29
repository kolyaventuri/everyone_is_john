import React from 'react';
import PropTypes from 'prop-types';

import GameManager from '../lib/game-manager';

export default class GameWindow extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const {gameId} = this.props.match.params;
    this.gameId = gameId;
  }

  componentDidMount() {
    GameManager.joinGame(this.gameId);
  }

  render() {
    const {gameId} = this;

    return (
      <h1>Game {gameId}</h1>
    );
  }
}
