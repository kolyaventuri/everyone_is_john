import React from 'react';

import TextBox from '../components/text-box.jsx';
import Button from '../components/shared/button.jsx';

import GameManager from '../lib/game-manager';

export default class JoinGame extends React.Component {
  constructor(props) {
    super(props);

    this.textBox = <TextBox/>;
  }

  joinGame = () => {
    const {value} = this.textBox;

    GameManager.joinGame(value);
  }

  render() {
    const {textBox, joinGame} = this;

    return (
      <div>
        {textBox}
        <Button onClick={joinGame}>Join Game</Button>
      </div>
    );
  }
}
