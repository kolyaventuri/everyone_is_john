import React from 'react';

import TextBox from '../components/text-box.jsx';
import Button from '../components/shared/button.jsx';

import GameManager from '../lib/game-manager';

export default class JoinGame extends React.Component {
  state = {
    value: ''
  }

  joinGame = () => {
    GameManager.joinGame(this.state.value);
  }

  updateValue = event => {
    const {value} = event.target;

    this.setState({value});
  }

  render() {
    const {
      joinGame,
      updateValue,
      state: {
        value
      }
    } = this;

    return (
      <div>
        <TextBox value={value} onChange={updateValue}/>
        <Button onClick={joinGame}>Join Game</Button>
      </div>
    );
  }
}
